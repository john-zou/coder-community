import {Injectable} from '@nestjs/common';
import {isDocument} from '@typegoose/typegoose';
import {ObjectID} from 'mongodb';
import {ConversationModel, MessageModel, UserModel} from '../mongoModels';
import {CreateMessageBodyDto, CreateMessageSuccessDto, MessageDto} from './messages.dto';

@Injectable()
export class MessagesService {

    async getMessagesInConversation(conversationID: string): Promise<MessageDto[]> {
        const currentCoversation = await ConversationModel.findById(conversationID);
        const messageIDs = currentCoversation.messages;
        //@ts-ignore
        return (await MessageModel.find({
            _id: messageIDs
        }).lean()).map(message => {
            //@ts-ignore
            message.createdAt = message.createdAt.valueOf();
            return message;
        });
    }

    async createMessage(createMessageDto: CreateMessageBodyDto, userID: string, conversationID: string): Promise<CreateMessageSuccessDto> {
        console.log("convesation id: " + conversationID);
        const doc = {
            author: new ObjectID(userID),
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

        return {
            conversationID,
            _id: newMessage._id.toString(),
            author: userID.toString(),
            text: newMessage.text,
            createdAt: newMessage.createdAt.valueOf(),
            updatedAt: newMessage.updatedAt.valueOf(),
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
        foundMsg.populate('author');
        await foundMsg.execPopulate();//coupled with populate, returns a Promise
        if (isDocument(foundMsg.author)) {
            return foundMsg.author.name;
        } else {
            return "Not found!";
        }
    }
}
