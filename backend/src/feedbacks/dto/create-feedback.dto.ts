import {IsPositive, IsString, Max, Min} from "class-validator";

export class CreateFeedbackDto {
    message: string;
    @IsPositive()
    @Min(1)
    @Max(5)
    rating: number;
    @IsString()
    slug: string;
}
