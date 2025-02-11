import {CanActivate, ExecutionContext, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../custom-decorators/isPublic";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector: Reflector) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        let token = this.extractTokenFromHeader(request);
        if (!token) {
            token = this.extractTokenFromCookie(request);
            if (!token) {
                throw new UnauthorizedException();
            }
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(
                token,
                {
                    secret: 'SECRET'
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.['access_token'];
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
