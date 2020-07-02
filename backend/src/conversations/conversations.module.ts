import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from '../messages/message.schema';
import { User } from '../user/user.schema';

@Module({
  imports: [TypegooseModule.forFeature([Message, User])],
})
export class ConversationsModule { }
