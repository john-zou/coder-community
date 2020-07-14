import { Test, TestingModule } from '@nestjs/testing';
import { EntityQueryGateway } from './entity-query.gateway';

describe('EntityQueryGateway', () => {
  let gateway: EntityQueryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityQueryGateway],
    }).compile();

    gateway = module.get<EntityQueryGateway>(EntityQueryGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
