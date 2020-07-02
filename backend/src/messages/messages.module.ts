import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from '../user/user.schema';
import { Message } from './message.schema';

@Module({
  imports: [TypegooseModule.forFeature([Message, User])],
  providers: [MessagesService]
})
export class MessagesModule { }
