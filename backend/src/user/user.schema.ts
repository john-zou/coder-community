import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';

@Schema()
export class User extends Document {//mapped to MongoDb collection 'users"
  @Prop({ required: true })
  userID: string;
  @Prop({ required: true })
  name: string;
  @Prop()
  profilePic: string;
  @Prop()
  backgroundImg: string;
  @Prop()
  status: string;
  @Prop()
  followers: User[]; //array of userID's
  followings: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);