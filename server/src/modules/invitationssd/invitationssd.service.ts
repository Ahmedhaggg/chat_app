import { Injectable } from '@nestjs/common';
import { CreateInvitationssdDto } from './dto/create-invitationssd.dto';
import { UpdateInvitationssdDto } from './dto/update-invitationssd.dto';

@Injectable()
export class InvitationssdService {
  create(createInvitationssdDto: CreateInvitationssdDto) {
    return 'This action adds a new invitationssd';
  }

  findAll() {
    return `This action returns all invitationssd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invitationssd`;
  }

  update(id: number, updateInvitationssdDto: UpdateInvitationssdDto) {
    return `This action updates a #${id} invitationssd`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitationssd`;
  }
}
