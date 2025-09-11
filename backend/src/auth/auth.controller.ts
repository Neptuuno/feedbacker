import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Request, Query} from '@nestjs/common';
import {Response} from 'express'
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";
import {Public} from "../custom-decorators/isPublic";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService) {
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
    googleAuth(@Res() res: Response) {
        res.redirect(this.authService.getGoogleAuthUrl());
    }

    // Handles the Google OAuth callback
    @Get('google/redirect')
    @Public()
    async googleAuthRedirect(@Query('code') code: string, @Res() res: Response) {
        const result = await this.authService.googleLogin(code);

        // Handle successful login
        if (result.user && result.accessToken) {
            // Set the JWT token as a cookie
            res.cookie('access_token', result.accessToken, {
                httpOnly: true,
                // secure: true, // Use this in production
                maxAge: 15 * 60 * 1000,
            });

            // Redirect to the Next.js frontend after successful authentication.
            // You can redirect to a specific dashboard or profile page.
            res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`);
        } else {
            // Redirect with an error message or to a dedicated error page
            res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login?error=oauth_failed`);
        }
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
