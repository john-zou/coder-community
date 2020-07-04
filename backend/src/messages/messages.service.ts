import { Injectable } from '@nestjs/common';
import { isDocument } from '@typegoose/typegoose';

import { MessageModel, UserModel } from '../mongoModels';

@Injectable()
export class MessagesService {

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
