import { Ref, prop } from "@typegoose/typegoose";
import { User } from "../user/user.schema";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Message extends TimeStamps {
  @prop({ ref: User })
  author: Ref<User>;

  @prop()
  content: string
}