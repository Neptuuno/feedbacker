import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {ProjectsModule} from './projects/projects.module';
import {FeedbacksModule} from './feedbacks/feedbacks.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./users/entities/user.entity";
import {Project} from "./projects/entities/project.entity";
import {Feedback} from "./feedbacks/entities/feedback.entity";

@Module({
    imports: [UsersModule, ProjectsModule, FeedbacksModule
        , TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [User,Project,Feedback],
            synchronize: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
