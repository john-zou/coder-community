import { Injectable, HttpService } from '@nestjs/common';
import { InitialDataDto } from './trending/initialData.dto';
import { Post } from './posts/post.schema';
import { User } from './user/user.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Our current API is at localhost:3001/api/';
  }
}
