import {prop} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

enum Type {
    IMAGE = 'image',
    VIDEO = 'video',
    FILE = 'file'
}

export class Attachment extends TimeStamps {
    @prop()
    name: string

    @prop({enum: Type})
    type: Type
}
