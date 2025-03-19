import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Project} from "./entities/project.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectsRepository: Repository<Project>,
        private usersService: UsersService
    ) {
    }


    async create(createProjectDto: CreateProjectDto, userId: number, imagePath: string | undefined): Promise<Project> {
        const user = await this.usersService.findOne(userId);
        const project = this.projectsRepository.create({...createProjectDto, user: user, imagePath: imagePath});
        return this.projectsRepository.save(project);
    }

    findAll(): Promise<Project[]> {
        return this.projectsRepository.find({
            relations: ['forms']
        });
    }

    async findOne(id: number): Promise<Project | null> {
        const project = await this.projectsRepository.findOne({
            where: {id},
            relations: ['forms','forms.feedbacks']
        });

        if (!project) {
            return null;
        }

        const feedbackData = await this.projectsRepository
            .createQueryBuilder('p')
            .leftJoin('p.forms', 'form')
            .leftJoin('form.feedbacks', 'feedback')
            .select([
                'AVG(feedback.rating) as avgRating',
                'feedback.device as device',
                'feedback.platform as platform',
                'COUNT(feedback.id) as feedbackCount',
            ])
            .where('p.id = :projectId', { projectId: id })
            .groupBy('feedback.device, feedback.platform')
            .getRawMany();

        const devices = {};
        const platforms = {};
        let totalFeedbacks = 0;
        let totalRating = 0;

        feedbackData.forEach(data => {
            const device = data.device || 'Unknown';
            const platform = data.platform || 'Unknown';
            const feedbackCount = parseInt(data.feedbackcount, 10);
            const avgRating = parseFloat(data.avgrating);

            devices[device] = (devices[device] || 0) + feedbackCount;
            platforms[platform] = (platforms[platform] || 0) + feedbackCount;
            totalFeedbacks += feedbackCount;
            totalRating += avgRating * feedbackCount;
        });

        const avgRating = totalFeedbacks ? totalRating / totalFeedbacks : 0;

        project.chartsData = {
            averageRating: avgRating,
            totalFeedbacks: totalFeedbacks,
            devices: Object.keys(devices).map(name => ({ name, count: devices[name] })),
            platforms: Object.keys(platforms).map(name => ({ name, count: platforms[name] }))
        };

        console.log(JSON.stringify(project.chartsData));
        console.log('-----------------');
        return project;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.findOne(id);
        return this.projectsRepository.save({...project, ...updateProjectDto});
    }

    async remove(id: number) {
        const project = await this.findOne(id);
        return await this.projectsRepository.remove(project);
    }

}
