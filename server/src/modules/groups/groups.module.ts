import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupCategory } from './entities/groupCategory.entity';
import { GroupCategoryController } from './controllers/groupCategory.controller';
import { GroupCategoryService } from './services/groupCategory.service';
import { UserModule } from '@modules/user/user.module';
import { GroupMembersController } from './controllers/groupMembers.controller';
import { GroupMembersService } from './services/groupMembers.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Group, GroupCategory])],
  controllers: [GroupsController, GroupCategoryController, GroupMembersController],
  providers: [GroupsService, GroupCategoryService, GroupMembersService],
  exports: [TypeOrmModule]
})
export class GroupsModule {}
