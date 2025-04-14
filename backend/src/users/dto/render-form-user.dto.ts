import {Expose} from "class-transformer";

export class RenderFormUserDto {
    @Expose()
    username: string;
}