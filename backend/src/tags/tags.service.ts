import { Injectable } from '@nestjs/common';
import { TagsDto } from './tags.dto';
import { TagModel } from '../mongoModels';
import { convertToStrArr } from '../util/helperFunctions';

@Injectable()
export class TagsService {

  async getTags(): Promise<TagsDto[]> {
    const tags = await TagModel.find();
    return tags.map((tag) => ({
      _id: tag._id.toString(),
      name: tag.name,
      posts: convertToStrArr(tag.posts),
    }));
  }
}
