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
import {ProjectsService} from './projects.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiConsumes} from "@nestjs/swagger";
import {CreateProjectWithImageDto} from "./dto/create-project-with-image.dto";
import {UpdateProjectWithImageDto} from "./dto/update-project-with-image.dto";
import {CaslAbilityFactory} from "../casl/casl-ability.factory";
import {checkAbility} from "../casl/checkAbility";
import {Action} from "../casl/action.enum";

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService,
                private readonly caslAbilityFactory: CaslAbilityFactory) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateProjectWithImageDto})
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProjectDto: CreateProjectDto,
        @Request() req
    ) {
        return this.projectsService.create(createProjectDto, req.user.sub, file?.path);
    }

    @Get()
    findAll(@Request() req) {
        return this.projectsService.findAllByUser(req.user.sub);
    }


    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        const project = await this.projectsService.findOne(+id);
        checkAbility(this.caslAbilityFactory, req.user, Action.Read, project);
        return project;
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: UpdateProjectWithImageDto})
   async update(@Param('id') id: string,
           @Body() updateProjectDto: UpdateProjectDto,
           @UploadedFile() file: Express.Multer.File,
           @Request() req) {
        const project = await this.projectsService.findOne(+id);
        checkAbility(this.caslAbilityFactory, req.user, Action.Update, project);
        return this.projectsService.update(project, updateProjectDto, file?.path);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(+id);
    }
}
