import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from '../messages/message.schema';
import { User } from '../user/user.schema';
import { ConversationsService } from './conversations.service';
import { Conversation } from './conversation.schema';

@Module({
  imports: [TypegooseModule.forFeature([Conversation, Message, User])],
  providers: [ConversationsService]
})
export class ConversationsModule { }
