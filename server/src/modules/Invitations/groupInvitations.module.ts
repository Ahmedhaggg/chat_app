import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInvitation } from './entities/groupInvitation.entity';
import { GroupInvaitationController } from './controllers/groupInvitation.controller';
import { GroupInvitationService } from './services/groupInvitation.service';

@Module({
    imports: [TypeOrmModule.forFeature([GroupInvitation])],
    controllers: [GroupInvaitationController],
    providers: [GroupInvitationService]
})
export class GroupInvitationsModule {}
