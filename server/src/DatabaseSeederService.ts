import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupCategory } from './modules/groups/entities/groupCategory.entity';

@Injectable()
export class DatabaseSeederService {
  constructor(
    @InjectRepository(GroupCategory)
    private readonly groupCategoryRepository: Repository<GroupCategory>,
  ) {}

  async seedData() {
    let categories = await this.groupCategoryRepository.find();

    if (categories.length > 0)
      return;
    const seedData = [
      { name: "music" },
      { name: "football" },
    ];

    await this.groupCategoryRepository.save(seedData);
  }
}