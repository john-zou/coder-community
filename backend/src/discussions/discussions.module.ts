import { Module } from '@nestjs/common';
import { DiscussionsController } from './discussions.controller';
import { DiscussionsService } from './discussions.service';

@Module({
  providers: [DiscussionsService]
})
export class DiscussionsModule {
  // imports: [UserModule],
  controllers: [DiscussionsController];
  providers: [DiscussionsService]
}
