import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Link} from "./entities/link.entity";
import {FormsModule} from "../forms/forms.module";

@Module({
  imports: [TypeOrmModule.forFeature([Link]),FormsModule],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService]
})
export class LinksModule {}
