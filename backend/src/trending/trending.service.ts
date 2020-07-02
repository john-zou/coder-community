import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Post } from '../posts/post.schema';
import { User } from '../user/user.schema';
import { InitialDataDto } from './initialData.dto';
import { Personal } from '../auth/guards/personal.decorator';

@Personal()
@Injectable()
export class TrendingService {
  constructor(@InjectModel(Post) private postModel: ReturnModelType<typeof Post>, @InjectModel(User) private userModel: ReturnModelType<typeof User>, private readonly httpService: HttpService) { }

  // getInitialData(): InitialDataDto {
  // }
}
