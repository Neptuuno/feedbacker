import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as argon2 from "argon2";
import {Response} from 'express'


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async signIn(email: string, pass: string, response: Response): Promise<void> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !await argon2.verify(user.password, pass)) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, email: user.email};
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
    }

    async signUp(email: string, pass: string) {
        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const hash = await argon2.hash(pass);
        const createUserDto: CreateUserDto = {email, password: hash};
        return this.usersService.create(createUserDto);
    }
}
