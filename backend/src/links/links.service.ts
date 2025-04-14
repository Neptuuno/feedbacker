import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateLinkDto} from './dto/create-link.dto';
import {UpdateLinkDto} from './dto/update-link.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "./entities/link.entity";
import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';
import {FormsService} from "../forms/forms.service";
import {plainToInstance} from "class-transformer";
import {LinkWithUserDto} from "./dto/link-with-user.dto";

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Link)
        private linksRepository: Repository<Link>,
        private formsService: FormsService,
    ) {
    }

    async create(createLinkDto: CreateLinkDto) {
        const slug = uuidv4();
        const form = await this.formsService.findOne(createLinkDto.formId);
        if (!form) {
            throw new NotFoundException(`Form with ID ${createLinkDto.formId} not found`);
        }

        const link = this.linksRepository.create({...createLinkDto, slug, form: form});
        return this.linksRepository.save(link);
    }

    findAll() {
        return this.linksRepository.find();
    }

    findOne(id: number) {
        return this.linksRepository.findOneBy({id});
    }

  async findBySlug(slug: string) {
        const link = await this.linksRepository.findOne({
            where: {slug},
            relations: ['form','form.project','form.user'],
        });

        if (!link) {
            throw new NotFoundException(`Link with slug "${slug}" not found`);
        }

      console.log(link)

        return plainToInstance(LinkWithUserDto, link, {excludeExtraneousValues: true});
    }

    update(id: number, updateLinkDto: UpdateLinkDto) {
        return `This action updates a #${id} link`;
    }

    async remove(id: number) {
        await this.linksRepository.delete(id);
    }
}
