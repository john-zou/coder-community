import { Injectable } from '@nestjs/common';

import { UserModel } from '../mongoModels';
import { PostDto } from '../posts/dto/posts.dto';
import { convertToStrArr } from '../util/helperFunctions';
import { UserDto } from './dto/user.dto';
import { User } from './user.schema';

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
  async findUserById(userObjectID: string): Promise<UserDto> {
    const foundUser = await UserModel.findById(userObjectID);
    return {
      _id: foundUser._id,
      userID: foundUser.userID,
      name: foundUser.name,
      profilePic: foundUser.profilePic,
      profileBanner: foundUser.profileBanner,
      status: foundUser.status,
      followers: convertToStrArr(foundUser.followers),
      following: convertToStrArr(foundUser.following),
      groups: convertToStrArr(foundUser.groups),
      posts: convertToStrArr(foundUser.posts),
      savedPosts: convertToStrArr(foundUser.savedPosts),
      likedPosts: convertToStrArr(foundUser.likedPosts),
    };
  }

  async saveProfileBannerPic(userObjectID: string, url: string): Promise<void> {
    await UserModel.updateOne({ _id: userObjectID }, { backgroundImg: url });
  }

  async saveProfilePic(userObjectID: string, url: string): Promise<void> {
    await UserModel.updateOne({ _id: userObjectID }, { profilePic: url });
  }

  async getAuthors(posts: PostDto[]): Promise<UserDto[]> {
    console.log("**** get authors")
    const result: UserDto[] = [];
    for (const post of posts) {
      console.log(post);
      const foundUser = await UserModel.findById(post.author);
      console.log(foundUser);
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
