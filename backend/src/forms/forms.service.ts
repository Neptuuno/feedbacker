import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateFormDto} from './dto/create-form.dto';
import {UpdateFormDto} from './dto/update-form.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Form} from "./entities/form.entity";
import {ProjectsService} from "../projects/projects.service";
import {UsersService} from "../users/users.service";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form)
        private formsRepository: Repository<Form>,
        private projectsService: ProjectsService,
        private usersService: UsersService
    ) {
    }

    async create(createFormDto: CreateFormDto, userId: number) {
        const project = await this.projectsService.findOne(createFormDto.projectId);
        if (!project) {
            throw new NotFoundException(`Project with ID ${createFormDto.projectId} not found`);
        }
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const form = this.formsRepository.create({...createFormDto, project: project, user: user});
        return this.formsRepository.save(form);
    }

    findAll() {
        return this.formsRepository.find({
            relations: ["links"]
        });
    }

    findOne(id: number) {
        return this.formsRepository.findOne({
            where: {id},
            relations: ["links", "feedbacks"]
        });
    }

    update(id: number, updateFormDto: UpdateFormDto) {
        return `This action updates a #${id} form`;
    }

    async remove(id: number) {
        await this.formsRepository.delete(id);
    }
}
