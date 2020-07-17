import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';

import { ConversationModel, MessageModel, UserModel } from '../mongoModels';
import { convertToStrArr, createConversationNameFromNamesOfUsers } from '../util/helperFunctions';
import { CreateConversationBodyDto, CreateConversationSuccessDto } from './conversation.dto';
import { Conversation } from './conversation.schema';
import { ConversationDto } from '../messages/messenger.ws.dto';

@Injectable()
export class ConversationsService {

  //used for creating new conversation or group conversation
  async createConversation(createConversationBodyDto: CreateConversationBodyDto, userID: string): Promise<ConversationDto> {
    //message may not exist when a new group is just created

    let name = createConversationBodyDto.name;
    if (!name) {
      name = createConversationNameFromNamesOfUsers(createConversationBodyDto.users);
    }
    let newConv;
    if (createConversationBodyDto.message) {

      const newMsg = {
        author: new ObjectID(userID),
        text: createConversationBodyDto.message
      }
      const newMessage = new MessageModel(newMsg);
      await newMessage.save();
      newConv = { name, users: createConversationBodyDto.users, messages: [newMessage._id] };
    }
    else {
      newConv = { name: createConversationBodyDto.name, users: createConversationBodyDto.users, messages: [] };
    }
    const newConversation = new ConversationModel(newConv);
    await newConversation.save();
    // add this conversation to every user involved
    await UserModel.updateMany({_id: {$in: createConversationBodyDto.users}}, {$push: {conversations: newConversation._id}});

    return {
      name: createConversationBodyDto.name,
      _id: newConversation._id.toString(),
      users: createConversationBodyDto.users,
      messages: convertToStrArr(newConversation.messages),
      createdAt: newConversation.createdAt.valueOf(),
    }
  }

  async test(): Promise<Conversation> {
    const conversation = await ConversationModel.findOne();
    return conversation;
  }
}
