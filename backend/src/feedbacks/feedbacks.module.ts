import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Feedback} from "./entities/feedback.entity";
import {LinksModule} from "../links/links.module";

@Module({
  imports: [TypeOrmModule.forFeature([Feedback]),LinksModule],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
