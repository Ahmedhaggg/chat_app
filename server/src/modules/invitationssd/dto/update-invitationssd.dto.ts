import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationssdDto } from './create-invitationssd.dto';

export class UpdateInvitationssdDto extends PartialType(CreateInvitationssdDto) {
  id: number;
}
