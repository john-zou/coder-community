import { Injectable, NotFoundException } from '@nestjs/common';

import { UserModel } from '../mongoModels';
import { PostDto } from '../posts/dto/posts.dto';
import { convertToStrArr, convertUserToUserDto } from '../util/helperFunctions';
import { UserDto, GetUsersSuccessDto } from './dto/user.dto';
import { User } from './user.schema';
import { ObjectId } from 'mongodb';
import { userInfo } from 'os';
import { Model } from 'mongoose';

/**
 * typed like in UserSchema
 */
type ExtraGitHubUserInfo = {
  name?: string;
  profilePic?: string;
  status?: string;
};

@Injectable()
export class UserService {

  async addFollower(userObjectID: string, id: string): Promise<boolean> {
    const foundUser = UserModel.findById(id);
    console.log(foundUser);
    await UserModel.updateOne({ _id: userObjectID }, {
      $push: {
        followers: (await foundUser)._id,
      }
    })
    return true;
  }

  async addFollowing(userObjectID: string, id: string): Promise<boolean> {
    const foundUser = UserModel.findById(id);
    await UserModel.updateOne({ _id: userObjectID }, {
      $push: {
        following: (await foundUser)._id,
      }
    })
    return true;
  }

  async findUsersByIds(ids: string[]): Promise<GetUsersSuccessDto> {
    const users = await UserModel.find({
      _id: {
        $in: ids
      }
    })
    return {
      users: users.map((user) => convertUserToUserDto(user))
    }
  }

  async findUserById(userObjectID: string): Promise<UserDto> {
    const foundUser = await UserModel.findById(userObjectID);
    if (!foundUser) {
      throw new NotFoundException();
    }
    return convertUserToUserDto(foundUser);
  }

  async saveProfileBannerPic(userObjectID: string, url: string): Promise<void> {
    await UserModel.updateOne({ _id: userObjectID }, { backgroundImg: url });
  }

  async saveProfilePic(userObjectID: string, url: string): Promise<void> {
    await UserModel.updateOne({ _id: userObjectID }, { profilePic: url });
  }

  //to get the authors of trending posts
  async getAuthors(posts: PostDto[]): Promise<UserDto[]> {
    const result: UserDto[] = [];
    for (const post of posts) {
      const foundUser = await UserModel.findById(post.author);
      result.push({
        _id: foundUser._id,
        userID: foundUser.userID,
        name: foundUser.name,
        profilePic: foundUser.profilePic,
        likedPosts: convertToStrArr(foundUser.likedPosts),
      });
    }
    return result;
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
    extraInfo?: ExtraGitHubUserInfo,
  ): Promise<{ isNewUser: boolean; _id: string }> {
    // Check if it's a new user
    const found = await UserModel.findOneAndUpdate(
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
      const newUser = await new UserModel({
        userID,
        gitHubID,
        followers: [],
        followings: [],
        lastLoggedIn: new Date(),
        name: extraInfo?.name || 'Coder Community Member',
        profilePic: extraInfo?.profilePic,
        status: extraInfo?.status,
      }).save();

      return { _id: newUser._id.toString(), isNewUser: true };
    }
  }
}
