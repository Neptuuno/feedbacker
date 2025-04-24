import {ApiProperty} from "@nestjs/swagger";
import {CreateProjectDto} from "./create-project.dto";
import {UpdateProjectDto} from "./update-project.dto";

export class UpdateProjectWithImageDto extends UpdateProjectDto{
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
