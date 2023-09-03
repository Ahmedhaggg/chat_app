import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupCategory } from '../entities/groupCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupCategoryService {
    constructor (
        @InjectRepository(GroupCategory) private readonly groupCategoryRepository: Repository<GroupCategory>
    ) {}

    async findAll() : Promise<GroupCategory[]> {
        return await this.groupCategoryRepository.find();
    }
}
