import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./entities/project.entity";
import {UsersModule} from "../users/users.module";
import {MulterModule} from "@nestjs/platform-express";
import {MulterConfigService} from '../shared/multer-config-service';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), UsersModule,
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }),
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {
}
