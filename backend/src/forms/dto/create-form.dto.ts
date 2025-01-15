import {IsNumber, IsPositive, Matches, MinLength} from "class-validator";

export class CreateFormDto {
    @MinLength(2)
    name: string;
    @MinLength(2)
    title: string;
    @MinLength(10)
    description: string;
    @Matches(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
    color: string;

    @IsNumber()
    @IsPositive()
    projectId: number;
}
