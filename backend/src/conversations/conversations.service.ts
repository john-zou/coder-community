import { Injectable } from '@nestjs/common';
import { Conversation } from './conversation.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ConversationsService {
  constructor(@InjectModel(Conversation) private conversationModel: ReturnModelType<typeof Conversation>) { }

  async test(): Promise<Conversation> {
    const conversation = await this.conversationModel.findOne();
    return conversation;
  }
}
