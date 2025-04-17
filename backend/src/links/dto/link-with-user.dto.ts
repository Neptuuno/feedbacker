import {Expose, Type} from "class-transformer";
import {RenderFormDto} from "../../forms/dto/render-form.dto";

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
}