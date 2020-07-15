import { forwardRef, Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ConversationsModule } from '../conversations/conversations.module';

@Module({
  imports: [forwardRef(() => ConversationsModule)],
  providers: [MessagesService, MessageGateway],
  controllers: [MessagesController]
})
export class MessagesModule { }
