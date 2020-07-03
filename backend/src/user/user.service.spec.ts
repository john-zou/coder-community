import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.schema';
import { LOCAL_MONGODB } from '../auth/constants';
import { MockMongo } from '../util/mock-mongo';
import { PostsService } from '../posts/posts.service';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;

  beforeAll(MockMongo);
  afterAll(MockMongo);

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRoot(LOCAL_MONGODB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }),
        TypegooseModule.forFeature([User, Post]),
        PostsService
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createOrUpdateUser', async () => {
    const { isNewUser, _id } = await service.createOrUpdateUser('octocat', 1);
    expect(isNewUser).toBe(true);
    const { isNewUser: secondTime, _id: id } = await service.createOrUpdateUser('octopus', 1);
    expect(secondTime).toBe(false);
    expect(id).toBe(_id);
  });

});
