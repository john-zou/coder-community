import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from '../messages/message.schema';
import { User } from '../user/user.schema';
import { ConversationsService } from './conversations.service';

@Module({
  imports: [TypegooseModule.forFeature([Message, User])],
  providers: [ConversationsService]
})
export class ConversationsModule { }
