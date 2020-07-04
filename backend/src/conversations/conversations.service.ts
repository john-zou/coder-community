import { Injectable } from '@nestjs/common';

import { ConversationModel } from '../mongo';
import { Conversation } from './conversation.schema';

@Injectable()
export class ConversationsService {

  async test(): Promise<Conversation> {
    const conversation = await ConversationModel.findOne();
    return conversation;
  }
}
