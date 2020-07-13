import { BadRequestException, Injectable } from '@nestjs/common';
import { PostModel } from '../mongoModels';
import { SearchResultDto } from './search.dto';

@Injectable()
export class SearchService {

  async search(query: string): Promise<SearchResultDto> {
    const trimmed = query?.trim();
    if (trimmed?.length === 0) {
      throw new BadRequestException('Invalid search query');
    }

    // https://docs.mongodb.com/manual/text-search/
    const posts = await PostModel.find({ $text: { $search: trimmed } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .lean(); // https://mongoosejs.com/docs/tutorials/lean.html
    return {
      posts
    }
  }
}
