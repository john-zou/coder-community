import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreateMessageBodyDto, CreateMessageSuccessDto } from './messages.dto';
import { MessagesService } from './messages.service';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @ApiBearerAuth()
  @Personal()
  @Post(':conversationID')
  createMessage(@Body() createMessageDto: CreateMessageBodyDto, @UserObjectID() userID: string, @Param('conversationID') conversationID: string): Promise<CreateMessageSuccessDto> {
    return this.messagesService.createMessage(createMessageDto, userID, conversationID);
  }
}
