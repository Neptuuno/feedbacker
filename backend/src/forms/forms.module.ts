import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Form} from "./entities/form.entity";
import {ProjectsModule} from "../projects/projects.module";

@Module({
  imports: [TypeOrmModule.forFeature([Form]),ProjectsModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
