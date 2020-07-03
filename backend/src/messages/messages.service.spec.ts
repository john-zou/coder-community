require('dotenv').config();
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from './message.schema';
import { MONGODB_URI } from '../auth/constants';
import { User } from '../user/user.schema';

describe('MessagesService', () => {
  let service: MessagesService;


  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     imports: [TypegooseModule.forRoot(MONGODB_URI), TypegooseModule.forFeature([User, Message])],
  //     providers: [MessagesService],
  //   }).compile();

  //   service = module.get<MessagesService>(MessagesService);
  // });
  

});
