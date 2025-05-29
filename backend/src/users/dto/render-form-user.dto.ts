import {Expose} from "class-transformer";

export class RenderFormUserDto {
    @Expose()
    id: number;

    @Expose()
    username: string;
}