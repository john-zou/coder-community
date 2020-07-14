import { BadRequestException, Injectable } from '@nestjs/common';
import { PostModel } from '../mongoModels';
import { SearchResultDto } from './search.dto';
import * as urlSlug from 'url-slug';

@Injectable()
export class SearchService {

  async search(query: string): Promise<SearchResultDto> {
    // Use urlSlug to help sanitize this string. Go from "aa bb" => "aa-bb" => ["aa", "bb"]
    const words = urlSlug(query).split('-');
    if (words.length === 0) {
      throw new BadRequestException('Invalid search query');
    }

    // https://docs.mongodb.com/manual/text-search/
    const posts = await PostModel.find({ $text: { $search: words[0] } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .lean(); // https://mongoosejs.com/docs/tutorials/lean.html
    return {
      posts
    }
  }
}
