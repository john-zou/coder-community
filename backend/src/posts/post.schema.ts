import {index, prop, Ref} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';

import {Comment} from '../comments/comment.schema';
import {Group} from '../groups/group.schema';
import {Tag} from '../tags/tag.schema';
import {User} from '../user/user.schema';

// https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/
// https://typegoose.github.io/typegoose/docs/decorators/indexes/
@index({title: 'text', content: 'text'}, {weights: {title: 5, content: 1}})
@index({score: -1})
export class Post extends TimeStamps {//mapped to MongoDb collection 'posts"
    @prop({ref: 'User'})
    author: Ref<User>;

    @prop()
    title: string;

    @prop()
    slug: string;

    @prop()
    previewContent: string;

    @prop()
    content: string;

    @prop({ref: 'Tag'})
    tags: Ref<Tag>[]; // This is automatically initialized as empty array

    @prop()
    featuredImg: string;

    @prop()
    likes: number;

    @prop({ref: 'Comment'})
    comments: Ref<Comment>[]; // This is automatically initialized as empty array

    @prop()
    views: number;

    @prop()
    score: number;

    @prop({ref: 'Group'})
    group: Ref<Group>;
}

