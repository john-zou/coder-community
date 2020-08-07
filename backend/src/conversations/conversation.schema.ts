import {prop, Ref} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

import {Message} from '../messages/message.schema';
import {User} from '../user/user.schema';

export class Conversation extends TimeStamps {
    @prop()
    name: string;

    @prop({ref: 'User'})
    users: Ref<User>[];

    @prop({ref: 'Message'})
    messages: Ref<Message>[];
}
