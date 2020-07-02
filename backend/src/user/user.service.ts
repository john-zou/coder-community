import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  /**
   * @param userID GitHub login
   * @returns whether the user had to be newly created
   */
  constructor(@InjectModel(User) private userModel: ReturnModelType<typeof User>) { }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * @param userID GitHub login name e.g. octocat, user is able to change this on GitHub.com (not permanent)
   * @param gitHubID GitHub ID (permanent)
   * 
   * @returns true if it's a new user. Later, the front end can use this information
   */
  async createOrUpdateUser(userID: string, gitHubID: number): Promise<boolean> {
    // Check if it's a new user
    const found = await this.userModel.findOneAndUpdate({
      gitHubID
    }, {
      userID,
      lastLoggedIn: new Date()
    });
    if (found) { return false } else {
      // Create a new user
      await new this.userModel({
        userID, gitHubID,
        followers: [],
        followings: [],
        lastLoggedIn: new Date(),
        name: "Coder Community Member"
      }).save();

      return true;
    }
  }
}
