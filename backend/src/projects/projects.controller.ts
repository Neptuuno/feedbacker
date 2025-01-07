import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import {CreateProjectWithImageDto} from "./dto/create-project-with-image.dto";

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: CreateProjectWithImageDto})
  create(
      @UploadedFile() file: Express.Multer.File,
      @Body() createProjectDto: CreateProjectDto,
      @Request() req
  ) {
      console.log(file)
    return this.projectsService.create(createProjectDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
