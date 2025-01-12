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
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule } from '@nestjs/serve-static';
import { FormsModule } from './forms/forms.module';
import {Form} from "./forms/entities/form.entity";

@Module({
    imports: [UsersModule, ProjectsModule, FeedbacksModule
        , TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'db',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'postgres',
            entities: [User,Project,Form,Feedback],
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: './upload-images',
            serveRoot: '/upload-images'
        }),
        AuthModule,
        FormsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
