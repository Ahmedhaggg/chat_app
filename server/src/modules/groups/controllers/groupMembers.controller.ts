import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { GroupMembersService } from "../services/groupMembers.service";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "@common/guards/auth.guard";

@Controller("v1/groups/:groupId/members")
@ApiBearerAuth()
export class GroupMembersController {
    constructor (private groupMembersService : GroupMembersService) {}

    @Get("")
    @UseGuards(AuthGuard)
    async findAll(@Param("groupId", ParseIntPipe) groupId: number) {
        let group = await this.groupMembersService.findGroupMembers(groupId);
        return { group };
    }
}