import { Module } from '@nestjs/common';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';

@Module({
  controllers: [DiscussionsController],
  providers: [DiscussionsService]
})
export class DiscussionsModule { }