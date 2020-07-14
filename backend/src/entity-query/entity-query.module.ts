import { Module } from '@nestjs/common';
import { EntityQueryGateway } from './entity-query.gateway';

@Module({
  providers: [EntityQueryGateway]
})
export class EntityQueryModule {}
