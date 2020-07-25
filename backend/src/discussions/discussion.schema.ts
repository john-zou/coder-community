import { prop, Ref } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { User } from "../user/user.schema";

export class Discussion extends TimeStamps {
  @prop({ ref: 'User' })
  author: Ref<User>;

  @prop()
  content: string;
}