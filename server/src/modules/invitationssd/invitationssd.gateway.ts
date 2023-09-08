import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { InvitationssdService } from './invitationssd.service';
import { CreateInvitationssdDto } from './dto/create-invitationssd.dto';
import { UpdateInvitationssdDto } from './dto/update-invitationssd.dto';

@WebSocketGateway()
export class InvitationssdGateway {
  constructor(private readonly invitationssdService: InvitationssdService) {}

  @SubscribeMessage('createInvitationssd')
  create(@MessageBody() createInvitationssdDto: CreateInvitationssdDto) {
    return this.invitationssdService.create(createInvitationssdDto);
  }

  @SubscribeMessage('findAllInvitationssd')
  findAll() {
    return this.invitationssdService.findAll();
  }

  @SubscribeMessage('findOneInvitationssd')
  findOne(@MessageBody() id: number) {
    return this.invitationssdService.findOne(id);
  }

  @SubscribeMessage('updateInvitationssd')
  update(@MessageBody() updateInvitationssdDto: UpdateInvitationssdDto) {
    return this.invitationssdService.update(updateInvitationssdDto.id, updateInvitationssdDto);
  }

  @SubscribeMessage('removeInvitationssd')
  remove(@MessageBody() id: number) {
    return this.invitationssdService.remove(id);
  }
}
