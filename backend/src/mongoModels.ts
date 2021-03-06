import {getModelForClass} from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

import {Attachment} from './attachments/attachment.schema';
import {Comment} from './comments/comment.schema';
import {Conversation} from './conversations/conversation.schema';
import {Group} from './groups/group.schema';
import {Message} from './messages/message.schema';
import {Post} from './posts/post.schema';
import {Tag} from './tags/tag.schema';
import {User} from './user/user.schema';
import {Video} from './video/video.schema';
import {Logger} from '@nestjs/common';
import {Discussion} from './discussions/discussion.schema';
import {Question} from './questions/question.schema';

let mongooseInstance: typeof mongoose;

// Add additional classes here. (Also add it to above ModelType definition)
export const AttachmentModel = getModelForClass(Attachment);
export const CommentModel = getModelForClass(Comment);
export const ConversationModel = getModelForClass(Conversation);
export const DiscussionModel = getModelForClass(Discussion);
export const GroupModel = getModelForClass(Group);
export const MessageModel = getModelForClass(Message);
export const PostModel = getModelForClass(Post);
export const TagModel = getModelForClass(Tag);
export const UserModel = getModelForClass(User);
export const VideoModel = getModelForClass(Video);
export const QuestionModel = getModelForClass(Question);

export const DefaultMongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

export async function initializeMongo(connectionString: string): Promise<void> {
    mongooseInstance = await mongoose.connect(connectionString, DefaultMongoOptions);
    Logger.log("Connected to: " + connectionString, "initializeMongo");
}

export function disconnectMongo(): Promise<void> {
    return mongooseInstance.disconnect();
}