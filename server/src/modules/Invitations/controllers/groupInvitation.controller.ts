import { ReqUser } from "@common/decorators/user.decoratory";
import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateInvitationDto } from "../dto/createInvitation.dto";
import { GroupInvitationService } from "../services/groupInvitation.service";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("v1/groups")
@ApiBearerAuth()
export class GroupInvaitationController {
    constructor(private groupInvitationService : GroupInvitationService) {}

    @Post("/:groupId/invitations")
    async create(
        @ReqUser() user, 
        @Body("receiverId", ParseIntPipe) receiverId: number, 
        @Param("groupId", ParseIntPipe) groupId: number 
    ) {
        await this.groupInvitationService.create({ 
            senderId: user.id, 
            receiverId
        })
    }

    @Get("/:groupId/invitations")
    async findAll(
        @ReqUser() user,
        @Param("groupId", ParseIntPipe) groupId: number 
    ) {
       let invitations = await this.groupInvitationService.findInvitationsSentByMember(user.id, groupId);
       return { invitations }
    }
    
}