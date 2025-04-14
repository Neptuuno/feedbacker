import {Expose, Type} from "class-transformer";
import {RenderFormDto} from "../../forms/dto/render-form.dto";
import {RenderFormUserDto} from "../../users/dto/render-form-user.dto";

export class LinkWithUserDto {
    @Expose()
    id: number;

    @Expose()
    slug: string;

    @Expose()
    isActive: boolean;

    @Type(() => RenderFormDto)
    @Expose()
    form: RenderFormDto;

    @Type(() => RenderFormUserDto)
    @Expose()
    user: RenderFormUserDto;
}