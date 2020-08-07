import {HttpModule, Module} from '@nestjs/common';
import {TrendingController} from './trending.controller';
import {TrendingService} from './trending.service';
import {PostsModule} from 'src/posts/posts.module';
import {UserModule} from 'src/user/user.module';
import {TagsModule} from '../tags/tags.module';
import {TrendingGateway} from './trending.gateway';

@Module({
    imports: [HttpModule, PostsModule, UserModule, TagsModule],
    controllers: [TrendingController],
    providers: [TrendingService, TrendingGateway]
})
export class TrendingModule {
}
