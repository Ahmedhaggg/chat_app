import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { GroupInvitationService } from "../services/groupInvitation.service";
import { ReqUser } from "@common/decorators/user.decoratory";
import { CreateGroupInvitationDto } from "../dto/createGroupInvitation.dto";
import { RedisService } from "nestjs-redis"
@WebSocketGateway()
export class GroupInvitationGateway {
    @WebSocketServer()
    server: Server
    constructor (private groupInvitationService: GroupInvitationService, private redisService: RedisService) {

    }

    @SubscribeMessage("sendInvitation")
    async create(
        @ReqUser() user, 
        @MessageBody("receiverId") messageData: CreateGroupInvitationDto, 
    ) {
        // let { group, sender } = await this.groupInvitationService.create({ 
        //     senderId: user.id, 
        //     ...messageData
        // });
        // this.redisService.getClient().smembers(`online_users:${Create}`)
        // this.server.to(messageData.receiverId.toString()).emit(
        //     JSON.stringify({ type: "invitation", group, sender})
        // );
        // return { message: "user is invited successfully"};
    }

    
}