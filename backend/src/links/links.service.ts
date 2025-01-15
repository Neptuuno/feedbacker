import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateLinkDto} from './dto/create-link.dto';
import {UpdateLinkDto} from './dto/update-link.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Link} from "./entities/link.entity";
import {Repository} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LinksService {
    constructor(
        @InjectRepository(Link)
        private linksRepository: Repository<Link>
    ) {
    }

    async create(createLinkDto: CreateLinkDto) {
        const slug = uuidv4();
        const link = this.linksRepository.create({...createLinkDto, slug});
        return this.linksRepository.save(link);
    }

    findAll() {
        return this.linksRepository.find();
    }

    findOne(id: number) {
        return this.linksRepository.findOneBy({id});
    }

    update(id: number, updateLinkDto: UpdateLinkDto) {
        return `This action updates a #${id} link`;
    }

    async remove(id: number) {
        await this.linksRepository.delete(id);
    }
}
