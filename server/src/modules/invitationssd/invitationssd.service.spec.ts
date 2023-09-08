import { Test, TestingModule } from '@nestjs/testing';
import { InvitationssdService } from './invitationssd.service';

describe('InvitationssdService', () => {
  let service: InvitationssdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationssdService],
    }).compile();

    service = module.get<InvitationssdService>(InvitationssdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
