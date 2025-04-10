import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Form} from "./entities/form.entity";
import {ProjectsModule} from "../projects/projects.module";
import {LinksService} from "../links/links.service";
import {LinksModule} from "../links/links.module";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Form]),ProjectsModule,UsersModule],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService]
})
export class FormsModule {}
