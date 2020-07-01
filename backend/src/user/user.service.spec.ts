import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.schema';
import { LOCAL_MONGODB } from '../auth/constants';
import { MockMongo } from '../util/mock-mongo';

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
        }),
        TypegooseModule.forFeature([User]),
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
    const isNew = await service.createOrUpdateUser('octocat', 1);
    expect(isNew).toBe(true);
    const isNewSecondTime = await service.createOrUpdateUser('octopus', 1);
    expect(isNewSecondTime).toBe(false);
  });

  // it('create new user', async () => {
  //   const newUser = {
  //     userID: "john-zou",
  //     name: "John Zou 2",
  //     status: "student",
  //     isLoggedIn: true,
  //     profilePic: "profile-pic.jpg",
  //     backgroundImg: "background-pic.jpg",
  //     followers: ["5efa69f7a2e9b30e302616a0"]
  //   };
  //   const createdUser = await service.create(newUser);
  //   Object.keys(newUser).forEach(key => {
  //     expect(createdUser[key]).toBe(newUser[key]);
  //   })
  // })
});
