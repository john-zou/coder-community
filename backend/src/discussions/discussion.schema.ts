import {prop, Ref} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Question} from "../questions/question.schema";
import {User} from "../user/user.schema";

export class Discussion extends TimeStamps {
    @prop({ref: 'User'})
    author: Ref<User>

    @prop({ref: 'Question'})
    question: Ref<Question>

    @prop()
    title: string;

    @prop()
    content: string;
}