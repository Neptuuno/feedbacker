import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as argon2 from "argon2";
import {Response} from 'express'
import {User} from "../users/entities/user.entity";
import {google} from "googleapis";
import {ConfigService} from "@nestjs/config";
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly oauthClient: any;

    constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) {
        this.oauthClient = new google.auth.OAuth2(
            this.configService.get<string>('GOOGLE_CLIENT_ID'),
            this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
            this.configService.get<string>('GOOGLE_REDIRECT_URI'),
        );
    }

    async signIn(email: string, pass: string, response: Response): Promise<{access_token: string}> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !await argon2.verify(user.password, pass)) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, username: user.username};
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            // secure: true,
            maxAge: 15 * 60 * 1000,
        });
        return {
            access_token: accessToken
        };
    }

    async signUp(email: string, pass: string, response: Response) {
        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const hash = await argon2.hash(pass);
        const createUserDto: CreateUserDto = {email, password: hash};
        const user = await this.usersService.create(createUserDto);

        const payload = { sub: user.id, username: user.username };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            // secure: true,
            maxAge: 15 * 60 * 1000,
        });

        return {
            ...user,
            access_token: accessToken
        };
    }

    getGoogleAuthUrl(): string {
        return this.oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'], // Requesting email and profile info
            prompt: 'consent', // Force consent screen every time
        });
    }

    async googleLogin(code: string, response: Response): Promise<{ user: User, accessToken: string }> {
        try {
            const { tokens } = await this.oauthClient.getToken(code);
            this.oauthClient.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: this.oauthClient,
                version: 'v2'
            });

            // Get user info from Google's API
            const { data } = await oauth2.userinfo.get();
            if (!data) {
                throw new UnauthorizedException('Failed to get user data from Google.');
            }

            console.log(data);

            // Find or create the user in your database
            let user = await this.usersService.findOneByGoogleId(data.id);
            if (!user) {
                const randomPassword = crypto.randomBytes(32).toString('hex');
                const hash = await argon2.hash(randomPassword);
                const createUserDto: CreateUserDto = {
                    email: data.email,
                    googleId: data.id,
                    password: hash,
                };
                user = await this.usersService.create(createUserDto);
            }

            // Generate JWT for your application
            const payload = { sub: user.id, username: user.email };
            const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

            response.cookie('access_token', accessToken, {
                httpOnly: true,
                // secure: true,
                maxAge: 15 * 60 * 1000,
            });

            return { user, accessToken };

        } catch (error) {
            console.error('Google OAuth failed:', error);
            throw new UnauthorizedException('Google authentication failed.');
        }
    }

}
