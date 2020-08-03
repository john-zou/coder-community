import { prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class Question extends TimeStamps {
  @prop()
  title: string;

  @prop()
  content: string;

  @prop()
  solution: string;
}