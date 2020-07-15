import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { ConversationModel, MessageModel } from '../mongoModels';
import { convertToStrArr } from '../util/helperFunctions';
import { CreateConversationBodyDto, CreateConversationSuccessDto } from './conversation.dto';
import { Conversation } from './conversation.schema';

@Injectable()
export class ConversationsService {

  //used for creating new conversation or group conversation
  async createConversation(createConversationBodyDto: CreateConversationBodyDto, userID: string): Promise<CreateConversationSuccessDto> {
    //message may not exist when a new group is just created
    let newConv;
    if (createConversationBodyDto.message) {
      newConv = { name: createConversationBodyDto.name, users: createConversationBodyDto.users, messages: createConversationBodyDto.message };
      const newMsg = {
        author: new ObjectID(userID),
        text: createConversationBodyDto.message
      }
      const newMessage = new MessageModel(newMsg);
      await newMessage.save();
    }
    else {
      newConv = { name: createConversationBodyDto.name, users: createConversationBodyDto.users, messages: [] };
    }
    const newConversation = new ConversationModel(newConv);
    await newConversation.save();
    return {
      _id: newConversation._id.toString(),
      users: createConversationBodyDto.users,
      messages: convertToStrArr(newConversation.messages),
      createdAt: newConversation.createdAt.toString(),
    }
  }

  async test(): Promise<Conversation> {
    const conversation = await ConversationModel.findOne();
    return conversation;
  }
}
