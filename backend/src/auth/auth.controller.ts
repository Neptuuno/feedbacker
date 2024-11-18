import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/authDto";
import {AuthGuard} from "./auth.guard";
import {Public} from "../custom-decorators/isPublic";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @Public()
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto.email, authDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Public()
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto.email, authDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
