import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, isDocument } from '@typegoose/typegoose';
import { Message } from './message.schema';
import { User } from '../user/user.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messageModel: ReturnModelType<typeof Message>,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>) { }

  // For testing
  async getSomeonesName(): Promise<string> {
    const user = await this.userModel.findOne();
    const message = new this.messageModel();
    message.author = user._id;
    message.text = "hello world";
    await message.save();
    const foundMsg = await this.messageModel.findOne();
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
