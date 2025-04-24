import {Module} from '@nestjs/common';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./entities/project.entity";
import {UsersModule} from "../users/users.module";
import {MulterModule} from "@nestjs/platform-express";
import {MulterConfigService} from '../shared/multer-config-service';
import {CaslModule} from "../casl/casl.module";

@Module({
    imports: [TypeOrmModule.forFeature([Project]), UsersModule,
        MulterModule.registerAsync({
            useClass: MulterConfigService,
        }), CaslModule
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports:[ProjectsService]
})
export class ProjectsModule {
}
