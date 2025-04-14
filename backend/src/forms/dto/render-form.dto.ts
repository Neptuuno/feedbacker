import { Expose } from "class-transformer";

export class RenderFormDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    color: string;

}