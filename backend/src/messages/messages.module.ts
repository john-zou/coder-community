import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  providers: [MessagesService, MessageGateway],
  controllers: [MessagesController]
})
export class MessagesModule { }
