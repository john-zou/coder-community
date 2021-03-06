import {HttpException, Injectable, Logger, NotFoundException} from '@nestjs/common';

import {PostModel, UserModel} from '../mongoModels';
import {PostDto} from '../posts/dto/posts.dto';
import {convertToStrArr, convertUserToUserDto} from '../util/helperFunctions';
import {GetUsersSuccessDto, UpdateProfileReqDto, UserDto} from './dto/user.dto';
import {User} from './user.schema';
import {ObjectId} from 'mongodb';
import {DocumentType} from '@typegoose/typegoose';
import * as _ from "lodash";

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

    async getFollowingFollowersOfUser(userObjectID: string): Promise<GetUsersSuccessDto> {
        const user = await UserModel.findById(userObjectID)

        const following = (await this.findUsersByIds(convertToStrArr(user.following))).users
        const followers = (await this.findUsersByIds(convertToStrArr(user.followers))).users

        return {users: followers.concat(following)}
    }

    async addFollower(follower: string, personBeingFollowed: string): Promise<boolean> {
        await UserModel.updateOne({_id: personBeingFollowed}, {
            $push: {
                followers: new ObjectId(follower),
            }
        })
        return true;
    }

    async addFollowing(following: string, personFollowing: string): Promise<boolean> {
        await UserModel.updateOne({_id: personFollowing}, {
            $push: {
                following: new ObjectId(following),
            }
        })
        return true;
    }

    async removeFollower(follower: string, personBeingFollowed: string): Promise<boolean> {
        await UserModel.updateOne({_id: personBeingFollowed}, {
            $pull: {
                followers: new ObjectId(follower),
            }
        })
        return true;
    }

    async removeFollowing(following: string, personRemoving: string): Promise<boolean> {
        await UserModel.updateOne({_id: personRemoving}, {
            $pull: {
                following: new ObjectId(following),
            }
        })
        return true;
    }

    async convertUserIDsToUsersDoc(ids: string[]): Promise<DocumentType<User>[]> {
        // console.log("ids: " + ids);
        const foundUsers = await UserModel.find({
            _id: {
                $in: ids //mongoose automatically turn a string[] of ids into a list of ObjectId
            }
        })
        // console.log("list of user docs: " + foundUsers);
        return foundUsers;
    }

    async findUsersByIds(ids: string[]): Promise<GetUsersSuccessDto> {
        const users = await this.convertUserIDsToUsersDoc(ids);
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

    async findUserByUsername(username: string): Promise<UserDto> {
        const foundUser = await UserModel.findOne({userID: username});
        if (!foundUser) {
            throw new NotFoundException();
        }
        return convertUserToUserDto(foundUser);
    }

    async saveProfileBannerPic(userObjectID: string, url: string): Promise<void> {
        await UserModel.updateOne({_id: userObjectID}, {backgroundImg: url});
    }

    async saveProfilePic(userObjectID: string, url: string): Promise<void> {
        await UserModel.updateOne({_id: userObjectID}, {profilePic: url});
    }

    //save and unsave post
    async savePost(userObjectID: string, postID: string): Promise<void> {
        const user = await UserModel.findById(userObjectID);
        if (!user) {
            throw new HttpException("User does not exist in MongoDB!", 500);
        }
        const post = await PostModel.findById(postID);
        if (!post) {
            throw new NotFoundException();
        }
        const postAlreadyExists = user.savedPosts.find(savedPostID => savedPostID.toString() === postID);

        // Add to saved posts
        if (!postAlreadyExists) {
            user.savedPosts.push(post);
            await user.save();
        } else {
            await UserModel.updateOne({_id: user._id}, {$pull: {savedPosts: new ObjectId(post._id)}});
            await user.save();
        }
    }

    // To get the authors of the trending posts
    async getAuthors(posts: PostDto[]): Promise<UserDto[]> {
        const result: UserDto[] = [];
        for (const post of posts) {
            const foundUser = await UserModel.findById(post.author);
            if (!foundUser) {
                Logger.log(`post.author: ${post.author} could not be found. Deleting post.`, "UserService::getAuthors");
                // Do not send this post to the front end
                _.pull(posts, post);
                // Delete this post
                await PostModel.deleteOne({_id: post._id});
                continue;
            }
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
            return {_id: found._id.toString(), isNewUser: false};
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

            return {_id: newUser._id.toString(), isNewUser: true};
        }
    }

    /**
     * Used for editing profile
     */
    async updateProfile(userID: string, update: UpdateProfileReqDto): Promise<void> {
        const cleanUpdate: UpdateProfileReqDto = {};
        if (update.name) {
            cleanUpdate.name = update.name;
        }
        if (update.status) {
            cleanUpdate.status = update.status;
        }
        if (Array.isArray(update.tags)) {
            cleanUpdate.tags = update.tags;
        }
        await UserModel.updateOne({_id: userID}, <any>cleanUpdate);
    }
}
