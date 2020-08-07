import {Body, Controller, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Personal} from '../auth/guards/personal.decorator';
import {UserObjectID} from '../user/user-object-id.decorator';
import {CreateConversationBodyDto, CreateConversationSuccessDto} from './conversation.dto';
import {ConversationsService} from './conversations.service';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) {
    }

    @ApiBearerAuth()
    @Personal()
    @Post()
    createConversation(@Body() createConversationBodyDto: CreateConversationBodyDto, @UserObjectID() userID: string): Promise<CreateConversationSuccessDto> {
        return this.conversationsService.createConversation(createConversationBodyDto, userID);
    }
}
