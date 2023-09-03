import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "../entities/group.entity";
import { Repository } from "typeorm";

@Injectable()
export class GroupMembersService {
    constructor (@InjectRepository(Group) private readonly groupRepository: Repository<Group>) {}
    
    async findGroupMembers(id: number) : Promise<Group> {
        let group = await this.groupRepository.findOne({
            where: { id }, 
            select: {
                id: true,
                members: {
                    username: true,
                    photo: true
                },
                admin: {
                    username: true,
                    photo: true
                }
            },
            relations: {
                admin: true,
                members: true
            }
        })
        if (!group)
            throw new NotFoundException("group is not found");
        return group;
    }
}