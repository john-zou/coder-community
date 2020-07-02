import { Ref, prop, getModelForClass } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Attachment } from "../attachments/attachment.schema";

export class Message extends TimeStamps {
  @prop({ ref: User })
  author: Ref<User>;

  @prop()
  text: string

  @prop({ ref: Attachment })
  attachments: Ref<Attachment>[];
}

export const MessageModel = getModelForClass(Message);