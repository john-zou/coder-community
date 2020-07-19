import { prop, Ref } from "@typegoose/typegoose";
import { User } from "../user/user.schema";

// We defined this from scratch. It is a regular TypeScript or ES6 class
export class Shop {
  @prop() // only fields with @prop decorator will get processed by Typegoose (Mongoose)
  name: string;

  @prop()
  description: string; // unlike in Mongoose, we use regular types here, so lower case 'string' rather than 'String'

  @prop({ref: 'User'})
  owner: Ref<User>;
}