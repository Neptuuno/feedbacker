import {ApiProperty} from "@nestjs/swagger";
import {CreateProjectDto} from "./create-project.dto";

export class CreateProjectWithImageDto extends CreateProjectDto{
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
