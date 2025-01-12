import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Form} from "./entities/form.entity";

@Injectable()
export class FormsService {
  constructor(
      @InjectRepository(Form)
      private formsRepository: Repository<Form>,
  ) {
  }

  create(createFormDto: CreateFormDto) {
    const form = this.formsRepository.create(createFormDto);
    return this.formsRepository.save(form);
  }

  findAll() {
    return this.formsRepository.find();
  }

  findOne(id: number) {
    return this.formsRepository.findOneBy({id});
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  async remove(id: number) {
    await this.formsRepository.delete(id);
  }
}
