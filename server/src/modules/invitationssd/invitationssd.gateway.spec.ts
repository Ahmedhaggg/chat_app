import { Test, TestingModule } from '@nestjs/testing';
import { InvitationssdGateway } from './invitationssd.gateway';
import { InvitationssdService } from './invitationssd.service';

describe('InvitationssdGateway', () => {
  let gateway: InvitationssdGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationssdGateway, InvitationssdService],
    }).compile();

    gateway = module.get<InvitationssdGateway>(InvitationssdGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
