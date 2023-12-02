import { ReqUser } from '@common/decorators/user.decoratory';
import { AuthGuard } from '@common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OnlineUserService } from '../services/onlineUsers.service';

@WebSocketGateway()
export class OnlineUserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor (
    private onlineUserService: OnlineUserService,
  ) {}
  
  @UseGuards(AuthGuard)
  async handleConnection(client: Socket, @ReqUser() user: any) {
    await this.onlineUserService.addOnlineUser(user.id);
    return { success: true };
  }

  @UseGuards(AuthGuard)
  async handleDisconnect(client: Socket) {
    let { user } = client.request as unknown as { user: { id: number } } ;
    await this.onlineUserService.removeOnlineUser(user.id);
    return { success: true };
  }
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
