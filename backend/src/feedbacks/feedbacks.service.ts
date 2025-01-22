import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Feedback} from "./entities/feedback.entity";
import {LinksService} from "../links/links.service";
import DeviceDetector = require("device-detector-js");

@Injectable()
export class FeedbacksService {
  private readonly deviceDetector = new DeviceDetector();

  constructor(
      @InjectRepository(Feedback)
      private feedbacksRepository: Repository<Feedback>,
      private linksService: LinksService,
  ) {
  }

  async create(createFeedbackDto: CreateFeedbackDto, headers: {'user-agent': string }) {
    const userAgent = headers['user-agent'];
    console.log('user-agent',userAgent);
    const device = this.deviceDetector.parse(userAgent);
    console.log(device);
    const link = await this.linksService.findBySlug(createFeedbackDto.slug);
    if (!link) {
      throw new NotFoundException(`Link with slug ${createFeedbackDto.slug} not found`);
    }

    const feedback = this.feedbacksRepository.create({...createFeedbackDto,link: link,form: link.form, platform: device.os.name});
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
