import {Controller, Get, Logger, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TagsService} from './tags.service';
import {GetPostsByTagDto} from '../posts/dto/posts.dto';
import {GetPostsByTagQueryParams} from './tag.dto';
import {ApiTags} from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {
    }

    @UsePipes(new ValidationPipe({transform: true})) //turn string into specified @Query() type
    @ApiTags('Posts')
    @Get('posts')
    getPostsByTag(@Query() {tagID, fetchCount}: GetPostsByTagQueryParams): Promise<GetPostsByTagDto> {
        Logger.log(`getPostsByTag. tagID = ${tagID}, fetchCount = ${fetchCount}`, "TagsController");
        return this.tagsService.getPostsByTag(tagID, fetchCount);
    }
}
