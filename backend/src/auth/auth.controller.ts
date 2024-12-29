import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, Request} from '@nestjs/common';
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

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
