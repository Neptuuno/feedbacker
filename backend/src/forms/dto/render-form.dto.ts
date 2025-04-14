import {Expose, Type} from "class-transformer";
import {RenderFormUserDto} from "../../users/dto/render-form-user.dto";

export class RenderFormDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    color: string;

    @Type(() => RenderFormUserDto)
    @Expose()
    user: RenderFormUserDto;
}