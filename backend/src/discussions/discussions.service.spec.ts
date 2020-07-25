import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionsService } from './discussions.service';

describe('DiscussionsService', () => {
  let service: DiscussionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionsService],
    }).compile();

    service = module.get<DiscussionsService>(DiscussionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
