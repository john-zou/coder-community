import { forwardRef, Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ConversationsModule } from '../conversations/conversations.module';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserWsAuthGuard } from '../auth/guards/user-ws.guard';

@Module({
  imports: [forwardRef(() => ConversationsModule)],
  providers: [MessagesService, MessageGateway, UserWsAuthGuard],
  controllers: [MessagesController],
  exports: [MessageGateway]
})
export class MessagesModule { }
