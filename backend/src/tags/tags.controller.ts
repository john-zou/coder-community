import { Controller, Get, Param, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { GetPostsByTagDto } from '../posts/dto/posts.dto';
import { GetPostsByTagQueryParams } from './tag.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @ApiTags('Posts')
  @Get('posts')
  getPostsByTag(@Query() q: GetPostsByTagQueryParams): Promise<GetPostsByTagDto> {
    return this.tagsService.getPostsByTag(q.tagID, q.requestedCount, q.startIdx, q.excludePostIDs);
  }
}
