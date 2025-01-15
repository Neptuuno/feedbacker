import {IsBoolean, IsNumber, IsPositive, MinLength} from "class-validator";

export class CreateLinkDto {
    @MinLength(2)
    name: string
    @IsBoolean()
    isActive: boolean
    @IsNumber()
    @IsPositive()
    formId: number
}
