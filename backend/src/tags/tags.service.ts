
import { PostModel } from '../mongoModels';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsDto } from './tags.dto';
import { TagModel } from '../mongoModels';
import { GetPostsByTagDto } from '../posts/dto/posts.dto';
import { convertPostDocumentToPostDto } from '../util/helperFunctions';
// import { convertToStrArr } from '../util/helperFunctions';

@Injectable()
export class TagsService {
  async getPostsByTag(tagID: string, requestedCount = 5, startIdx = 0, excludePostIDs?: Record<string, boolean>): Promise<GetPostsByTagDto> {
    const tag = await TagModel.findById(tagID);
    if (!tag) {
      throw new NotFoundException();
    }

    const postIDs = new Array<string>(requestedCount);
    for (let i = startIdx, destIdx = 0; i < tag.posts.length && destIdx < requestedCount; ++i, ++startIdx) {
      const postID = tag.posts[i].toString();
      if (!(excludePostIDs && excludePostIDs[postID])) {
        postIDs[destIdx++] = postID;
      }
    }

    const postDocuments = await PostModel.find({ _id: { $in: postIDs}});

    console.log(postDocuments.length);
    console.log(postDocuments);

    const postDtos = postDocuments.map(convertPostDocumentToPostDto);

    return {
      cursor: startIdx,
      tagID,
      posts: postDtos
    };
  }

  // TODO: multiple tags, low priority
  // async getPostByTags

  async getTags(): Promise<TagsDto[]> {
    const tags = await TagModel.find();
    return tags.map((tag) => ({
      _id: tag._id.toString(),
      name: tag.name,
    }));
  }
}
