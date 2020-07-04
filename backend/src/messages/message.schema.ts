import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { Attachment } from '../attachments/attachment.schema';
import { User } from '../user/user.schema';

export class Message extends TimeStamps {
  @prop({ ref: 'User' })
  author: Ref<User>;

  @prop()
  text: string;

  @prop({ ref: 'Attachment' })
  attachments: Ref<Attachment>[];
}
