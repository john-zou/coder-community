import {forwardRef, HttpModule, Module} from '@nestjs/common';
import {VideoController} from './video.controller';
import {VideoService} from './video.service';
import {UserModule} from '../user/user.module';
import {PostsModule} from '../posts/posts.module';

@Module({
    imports: [HttpModule, forwardRef(() => UserModule), PostsModule],
    controllers: [VideoController],
    providers: [VideoService],

})

export class VideoModule {
}
