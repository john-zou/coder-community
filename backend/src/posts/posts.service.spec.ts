require('dotenv').config();

import { PostsService } from '../../dist/posts/posts.service';
import { TestingModule, Test } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { HttpModule } from '@nestjs/common';
import { initializeMongo, disconnectMongo } from '../mongoModels';
import { Secrets } from '../secrets';

describe('PostsService', () => {
  let postsService: PostsService;
  let userService: UserService;

  beforeAll(async () => {
    await initializeMongo(Secrets.MongoConnectionString);
  });

  afterAll(() => disconnectMongo());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, UserService],
      imports: [UserModule, HttpModule]
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    userService = module.get<UserService>(UserService);
  });

  // it('should be defined', () => {
  //   expect(postsService).toBeDefined();
  // });

  it("should create post", async () => {
    const newPost = {
      "title": "Hello World",
      "content": "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
      "tags": [
        "5f00b16372d3a61c90db420c",
        "5f00b16372d3a61c90db420d"
      ],
      "featuredImg": "http://dummyimage.com/738x705.bmp/5fa2dd/ffffff"
    }
    const post = await postsService.createPost("5efc177ab2aee52be820a71f", newPost);
    expect(post._id).toBeDefined();
    expect(post.slug).toBe("hello-world");
  })
});
