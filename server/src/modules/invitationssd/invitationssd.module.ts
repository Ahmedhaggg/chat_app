import { Module } from '@nestjs/common';
import { InvitationssdService } from './invitationssd.service';
import { InvitationssdGateway } from './invitationssd.gateway';

@Module({
  providers: [InvitationssdGateway, InvitationssdService],
})
export class InvitationssdModule {}
