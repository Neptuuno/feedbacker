import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Feedback} from "./entities/feedback.entity";

@Injectable()
export class FeedbacksService {
  constructor(
      @InjectRepository(Feedback)
      private feedbacksRepository: Repository<Feedback>,
  ) {
  }

  create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = this.feedbacksRepository.create(createFeedbackDto);
    return this.feedbacksRepository.save(feedback);
  }

  findAll() {
    return this.feedbacksRepository.find();
  }

  findOne(id: number) {
    return this.feedbacksRepository.findOneBy({id});
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.findOne(id);
    return this.feedbacksRepository.save({...feedback, ...updateFeedbackDto});
  }

  async remove(id: number) {
    const feedback = await this.findOne(id);
    return await this.feedbacksRepository.remove(feedback);
  }
}
