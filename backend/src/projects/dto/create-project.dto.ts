import {MinLength} from "class-validator";

export class CreateProjectDto {
    @MinLength(2)
    name: string;
    @MinLength(10)
    description: string
}
