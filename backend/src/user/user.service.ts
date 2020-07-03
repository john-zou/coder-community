import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  async saveProfileBannerPic(userObjectID: string, url: string): Promise<void> {
    await this.userModel.updateOne({_id: userObjectID}, {backgroundImg: url});
  }

  async saveProfilePic(userObjectID: string, url: string): Promise<void> {
    await this.userModel.updateOne({_id: userObjectID}, {profilePic: url});
  }

  // create(createUserDto: CreateUserDto): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * @param userID GitHub login name e.g. octocat, user is able to change this on GitHub.com (not permanent)
   * @param gitHubID GitHub ID (permanent)
   *
   * @returns true if it's a new user. Later, the front end can use this information
   */
  async createOrUpdateUser(
    userID: string,
    gitHubID: number,
  ): Promise<{ isNewUser: boolean; _id: string }> {
    // Check if it's a new user
    const found = await this.userModel.findOneAndUpdate(
      {
        gitHubID,
      },
      {
        userID,
        lastLoggedIn: new Date(),
      },
    );
    if (found) {
      return { _id: found._id.toString(), isNewUser: false };
    } else {
      // Create a new user
      const newUser = await new this.userModel({
        userID,
        gitHubID,
        followers: [],
        followings: [],
        lastLoggedIn: new Date(),
        name: 'Coder Community Member',
      }).save();

      return { _id: newUser._id.toString(), isNewUser: true };
    }
  }
}
