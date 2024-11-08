import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/authDto";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() authDto: AuthDto) {
        return this.authService.signIn(authDto.email, authDto.password);
    }
    @HttpCode(HttpStatus.OK)
    @Post('register')
    signUp(@Body() authDto: AuthDto) {
        return this.authService.signUp(authDto.email, authDto.password);
    }
}
