import {Injectable} from '@nestjs/common';
import {ObjectID} from 'mongodb';
import {DiscussionModel} from '../mongoModels';
import {CreateDiscussionDto, CreateDiscussionSuccessDto, DiscussionDto, GetDiscussionsDto} from './discussion.dto';

@Injectable()
export class DiscussionsService {

    async getDiscussionsByQuestionID(questionID: string): Promise<GetDiscussionsDto> {
        const foundDiscussions = await DiscussionModel.find({question: new ObjectID(questionID)});
        return {
            discussions: foundDiscussions.map((discussion) => ({
                _id: discussion._id.toString(),
                author: discussion.author.toString(),
                question: questionID,
                title: discussion.title,
                content: discussion.content,
            }))
        }
    }

    async createDiscussion(authorID: string, discussionDto: CreateDiscussionDto): Promise<CreateDiscussionSuccessDto> {
        const newDiscussion = new DiscussionModel({
            author: authorID,
            content: discussionDto.content
        })

        await newDiscussion.save();

        return {
            _id: newDiscussion._id
        }
    }

    async getDiscussionById(discussionID: string): Promise<DiscussionDto> {
        const foundDiscussion = await DiscussionModel.findById(discussionID);
        return {
            _id: discussionID,
            author: foundDiscussion.author.toString(),
            question: foundDiscussion.question.toString(),
            title: foundDiscussion.title,
            content: foundDiscussion.content,
        }
    }

}
