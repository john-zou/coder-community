import {forwardRef, HttpModule, Module} from '@nestjs/common';

import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {UserModule} from '../user/user.module';

@Module({
    imports: [HttpModule, forwardRef(() => UserModule)],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})
export class PostsModule {
}
