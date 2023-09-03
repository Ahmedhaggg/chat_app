import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from '../dto/createGroup.dto';
import { UpdateGroupDto } from '../dto/updateGroup.dto';
import { Group } from '../entities/group.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '@modules/user/entities/user.entity';
import { GroupCategory } from '../entities/groupCategory.entity';
import { nanoid } from 'nanoid';
import { FilterGroupsDto } from '../dto/filterGroups.dto';
import { dataSource } from 'src/database/dataSource';
import { GroupPrivacy } from '@common/enums/GroupPrivacy.enum';

@Injectable()
export class GroupsService {
  constructor (
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>, 
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectDataSource(dataSource) private dataSource: DataSource
    ) { };

  async create(adminId: string, createGroupDto: CreateGroupDto, image: string) : Promise<Omit<Group, "admin">> {
    let user =  await this.userRepository.findOne({ where: { id : adminId } });
    
    if (user.groupsNumber == 5)
      throw new BadRequestException("you have maximum groups");

    let category = new GroupCategory();
    category.id = createGroupDto.categoryId;

    let newGroup = new Group();
    newGroup.admin = user;
    newGroup.category = category;
    newGroup.code = nanoid(6);
    newGroup.image = image;
    newGroup.name = createGroupDto.name;
    newGroup.privacy = createGroupDto.privacy;
    newGroup.status = createGroupDto.status;

    await this.dataSource.transaction(async manager => {
      newGroup.id = (await manager.save(newGroup)).id;
      user.groupsNumber++;
      await await manager.save(user);
    });
    
    return newGroup;
  }

  async findAll(filterDto: FilterGroupsDto) : Promise<Group[]> {
    const queryBuilder = this.groupRepository
    .createQueryBuilder("groups")
    .leftJoinAndSelect("groups.category", "category")
    .where("groups.privacy= :privacy", { privacy: GroupPrivacy.public });

    if (filterDto.name)
      queryBuilder.andWhere("groups.name= :name", { name: filterDto.name });

    if (filterDto.categoryId)
      queryBuilder.andWhere("groups.category= :category", {category: filterDto.categoryId })
    

    return await queryBuilder
      .skip(((filterDto.page || 1) - 1) * 10)
      .take(filterDto.limit || 10)
      .getMany();
  }
  async findOne({ id, code }: { id?: number, code?: string  }) : Promise<Group> {
    const queryBuilder = this.groupRepository
      .createQueryBuilder("group")
      .leftJoinAndSelect("group.category", "category");
      
    if (id) 
      queryBuilder.where("group.id= :id", { id });
    if (code)
      queryBuilder.where("group.code= :code", { code });
    
    return await queryBuilder.getOne();
  }

  async update({ id, newGroupdata, newImage} : { id: number, newGroupdata?: UpdateGroupDto, newImage?: string}) : Promise<{oldImage: string, group: Group}> {
    let group = await this.groupRepository.findOneBy({ id });
    
    if (!group)
      throw new NotFoundException("group not found");

    if (newGroupdata) {
      group.privacy = newGroupdata.privacy;
      group.status = newGroupdata.status;
      group.name = newGroupdata.name;
    }

    // check if newImage
    let oldImage;
    if (newImage) {
      oldImage = group.image;
      group.image = newImage;
    }

    let newGroupData = await this.groupRepository.save(group);
    
    return { oldImage, group: newGroupData };
  }
  
  async remove(id: number, adminId: string) : Promise<{ image?: string }> {
    const group = await this.groupRepository.findOne({ where: { id } , relations: ["admin"] });
    
    if (!group)
      throw new NotFoundException()

    let groupImage = group.image;
    
    if (group.admin.id !== adminId) 
      throw new BadRequestException("permission denied");

    let admin = group.admin;
    admin.groupsNumber--;

    await this.dataSource.transaction(async manager => {
      await this.userRepository.save(admin);
      await this.groupRepository.delete(group.id);
    });
    return { image: groupImage }
  }
}
