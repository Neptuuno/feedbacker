import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {Project} from "./entities/project.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        private usersService: UsersService
    ) {
    }


    async create(createProjectDto: CreateProjectDto, userId: number, imagepath: string | undefined): Promise<Project> {
        const user = await this.usersService.findOne(userId);
        const project = this.projectsRepository.create({...createProjectDto, user: user, imagePath: imagepath});
        return this.projectsRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectsRepository.find();
    }

    findOne(id: number): Promise<Project | null> {
        return this.projectsRepository.findOneBy({id});
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.findOne(id);
        return this.projectsRepository.save({...project, ...updateProjectDto});
    }

    async remove(id: number) {
        const project = await this.findOne(id);
        return await this.projectsRepository.remove(project);
    }
}
