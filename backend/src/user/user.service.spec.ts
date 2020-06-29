import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './user.schema';
import { MONGODB_URI } from '../auth/constants';
import { create } from 'domain';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGODB_URI),
        MongooseModule.forFeature([{
          name: User.name, schema: UserSchema
        }])],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.only('create new user', async () => {
    const newUser = {
      userID: "john-zou",
      name: "John Zou",
      status: "student",
      isLoggedIn: true,
      profilePic: "profile-pic.jpg",
      backgroundImg: "background-pic.jpg",
      followers: ["barack-obama"]
    };
    const createdUser = await service.create(newUser);
    Object.keys(newUser).forEach(key => {
      // expect(createdUser[key]).toBe(newUser[key]);
    })
  })
});
