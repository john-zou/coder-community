import { Injectable } from '@nestjs/common';
import { DiscussionModel } from '../mongoModels';
import { CreateDiscussionSuccessDto, DiscussionDto } from './discussion.dto';

@Injectable()
export class DiscussionsService {
  async createDiscussion(authorID: string, discussionDto: DiscussionDto): Promise<CreateDiscussionSuccessDto> {
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
      author: foundDiscussion.author.toString(),
      content: foundDiscussion.content,
    }
  }

}
