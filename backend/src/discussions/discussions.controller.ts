import { Body, Controller, Get, Param } from '@nestjs/common';
import { Post } from '@typegoose/typegoose';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreateDiscussionDto, DiscussionDto } from './discussion.dto';

@Controller('discussions')
export class DiscussionsController {

  constructor(private readonly discussionsService: DiscussionsController) { };

  @Personal()
  @Post('/:id')
  createDiscussion(@UserObjectID() authorID: string, @Body() createDiscussionDto: DiscussionDto) {
    return this.discussionsService.createDiscussion(authorID, createDiscussionDto);
  }

  @Get('/:id')
  getDiscussionById(authorID: string, @Param('id') discusssionID: string): Promise<DiscussionDto> {
    return this.discussionsService.getDiscussionById(authorID, discusssionID);
  }

}
