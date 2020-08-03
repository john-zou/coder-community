import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreateDiscussionDto, CreateDiscussionSuccessDto, DiscussionDto, GetDiscussionsDto } from './discussion.dto';
import { DiscussionsService } from './discussions.service';

@ApiTags('Discussions')
@Controller('discussions')
export class DiscussionsController {

  constructor(private readonly discussionsService: DiscussionsService) { };

  @Personal()
  @Post('/:id')
  createDiscussion(@UserObjectID() authorID: string, @Body() createDiscussionDto: CreateDiscussionDto): Promise<CreateDiscussionSuccessDto> {
    return this.discussionsService.createDiscussion(authorID, createDiscussionDto);
  }

  @Get('/by-question-id/:id')
  getDiscussionsByQuestionID(@Param('id') questionID: string): Promise<GetDiscussionsDto> {
    return this.discussionsService.getDiscussionsByQuestionID(questionID);
  }

  @Get('/:id')
  getDiscussionById(@Param('id') discusssionID: string): Promise<DiscussionDto> {
    return this.discussionsService.getDiscussionById(discusssionID);
  }

}
