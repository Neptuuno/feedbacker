import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Request, Query, Injectable} from '@nestjs/common';
import {Response} from 'express'
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";
import {Public} from "../custom-decorators/isPublic";
import {ApiBearerAuth} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";

@Controller('auth')
@ApiBearerAuth()
@Injectable()
export class AuthController {
    constructor(private authService: AuthService,
                private configService: ConfigService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() authDto: AuthDto, @Res({passthrough: true}) response: Response) {
        return this.authService.signIn(authDto.email, authDto.password, response);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Public()
    signUp(@Body() authDto: AuthDto, @Res({passthrough: true}) response: Response) {
        return this.authService.signUp(authDto.email, authDto.password, response);
    }

    @Get('google/login')
    @Public()
    googleAuth(@Res() response: Response) {
        response.redirect(this.authService.getGoogleAuthUrl());
    }

    @Get('google/callback')
    @Public()
    async googleAuthRedirect(@Query('code') code: string, @Res({passthrough: true}) response: Response) {
        const result = await this.authService.googleLogin(code, response);

        if (result.user && result.accessToken) {
            response.redirect(`${this.configService.get<string>('FRONTEND_URL')}`);
        } else {
            response.redirect(`${this.configService.get<string>('FRONTEND_URL')}/login?error=oauth_failed`);
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
