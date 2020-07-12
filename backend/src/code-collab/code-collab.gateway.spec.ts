import { Test, TestingModule } from '@nestjs/testing';
import { CodeCollabGateway } from './code-collab.gateway';

describe('CodeCollabGateway', () => {
  let gateway: CodeCollabGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeCollabGateway],
    }).compile();

    gateway = module.get<CodeCollabGateway>(CodeCollabGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
