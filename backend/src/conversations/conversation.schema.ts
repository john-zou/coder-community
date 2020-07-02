import { Ref, prop, getModelForClass } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Message } from "../messages/message.schema";

export class Conversation extends TimeStamps {
  @prop()
  name: string;

  @prop({ ref: User })
  users: Ref<User>[];

  @prop({ ref: Message })
  messages: Ref<Message>[];
}

export const ConversationModel = getModelForClass(Conversation);