import { Injectable } from '@nestjs/common';
import { isDocument } from '@typegoose/typegoose';

import { ConversationModel, MessageModel, UserModel } from '../mongoModels';
import { convertToStrArr } from '../util/helperFunctions';
import { MessageGateway } from './message.gateway';
import { CreateMessageBodyDto, CreateMessageSuccessDto } from './messages.dto';

@Injectable()
export class MessagesService {

  async createMessage(createMessageDto: CreateMessageBodyDto, userID: string, conversationID: string): Promise<CreateMessageSuccessDto> {
    console.log("convesation id: " + conversationID);
    const doc = {
      text: createMessageDto.text
    }
    const newMessage = new MessageModel(doc);
    await newMessage.save();

    //add message to conversation
    await ConversationModel.findByIdAndUpdate(conversationID, {
      $push: {
        messages: newMessage._id
      }
    });

    // this.messageGateway.wss.emit('newMessage', newMessage);

    return {
      _id: newMessage._id.toString(),
      author: userID.toString(),
      text: newMessage.text,
      createdAt: newMessage.createdAt.toString(),
      updatedAt: newMessage.updatedAt.toString(),
    }
  }
  // For testing
  async getSomeonesName(): Promise<string> {
    const user = await UserModel.findOne();
    const message = new MessageModel();
    message.author = user._id;
    message.text = "hello world";
    await message.save();
    const foundMsg = await MessageModel.findOne();
    // console.log("before populate..." + foundMsg.author);//_id
    foundMsg.populate('author');
    // console.log("before execPopulate..." + foundMsg.author);//_id
    await foundMsg.execPopulate();//coupled with populate, returns a Promise
    // console.log("after populate..." + foundMsg.author);//author document/object
    if (isDocument(foundMsg.author)) {
      return foundMsg.author.name;
    } else {
      return "Not found!";
    }
  }
}
