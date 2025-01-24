import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Form} from "./entities/form.entity";
import {ProjectsService} from "../projects/projects.service";

@Injectable()
export class FormsService {
  constructor(
      @InjectRepository(Form)
      private formsRepository: Repository<Form>,
      private projectsService: ProjectsService
  ) {
  }

  async create(createFormDto: CreateFormDto) {
    const project = await this.projectsService.findOne(createFormDto.projectId);
    if (!project){
      throw new NotFoundException(`Project with ID ${createFormDto.projectId} not found`);
    }

    const form = this.formsRepository.create({...createFormDto, project: project});
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
      relations: ["links","feedbacks"]
    });
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  async remove(id: number) {
    await this.formsRepository.delete(id);
  }
}
