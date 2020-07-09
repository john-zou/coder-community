import { Injectable, Logger } from '@nestjs/common';
import { CreateGroupDto, GroupDto, CreateGroupSuccessDto, GetGroupsSuccessDto } from './group.dto';
import { UserModel, GroupModel } from '../mongoModels';
import { Group } from './group.schema';
import { convertToStrArr } from '../util/helperFunctions';
import { DocumentType } from '@typegoose/typegoose';
import { UserService } from '../user/user.service';
import { ObjectId } from 'mongodb';
@Injectable()
export class GroupsService {

  constructor(private readonly userService: UserService) { }

  async createGroup(creatorID: string, createGroupDto: CreateGroupDto): Promise<CreateGroupSuccessDto> {

    const user = await UserModel.findById(creatorID);
    // add admins, users, posts and videos arrays to the CreateGroupDto
    const groupDoc = { ...createGroupDto };

    const group = new GroupModel(groupDoc);
    // Add the creator as both admin and user
    group.admins.push(user);
    group.users.push(user);

    await group.save();

    // Add the group to the creator's list of groups
    user.groups.push(group);
    await user.save();

    //add the group to the invitees' list of groups
    await UserModel.updateMany({
      _id: {
        $in: createGroupDto.users
      }
    }, {
      $push: {
        groups: group._id
      }
    })

    return {
      _id: group._id.toString()
    }
  }

  async getGroups(): Promise<GetGroupsSuccessDto> {
    const allGroups = await GroupModel.find();
    return {
      groups: allGroups.map((group) => {
        return {
          _id: group._id.toString(),
          name: group.name,
          description: group.description,
          admins: convertToStrArr(group.admins),
          profilePic: group.profilePic,
          profileBanner: group.profileBanner,
          users: convertToStrArr(group.users),
          posts: convertToStrArr(group.posts),
          videos: convertToStrArr(group.videos),
          private: group.private,
          createdAt: group.createdAt.toString(),
          updatedAt: group.updatedAt.toString(),
        }
      })
    }
  }

  getGroupDto(foundGroup: DocumentType<Group>): GroupDto {
    return {
      _id: foundGroup._id.toString(),
      admins: convertToStrArr(foundGroup.admins),
      name: foundGroup.name,
      description: foundGroup.description,
      profileBanner: foundGroup.profileBanner,
      profilePic: foundGroup.profilePic,
      posts: convertToStrArr(foundGroup.posts),
      users: convertToStrArr(foundGroup.users),
      private: foundGroup.private,
      videos: convertToStrArr(foundGroup.videos),
      createdAt: foundGroup.createdAt.toString(),
      updatedAt: foundGroup.updatedAt.toString(),
    }
  }

  async getGroupById(groupID: string, memberID?: string): Promise<GroupDto> {
    const foundGroup = await GroupModel.findById(groupID);
    if (foundGroup.private) {
      if (convertToStrArr(foundGroup.users).includes(memberID)) {
        return this.getGroupDto(foundGroup);
      } else {
        throw new Error("Private group cannot be access by non-member");
      }
    }
    return this.getGroupDto(foundGroup);
  }

  async joinGroup(userID: string, groupID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async leaveGroup(userID: string, groupID: string): Promise<void> {
    //remove group from user's list of groups
    await UserModel.updateOne({ _id: new ObjectId(userID) }, {
      $pull: {
        groups: new ObjectId(groupID)
      }
    })
    //remove user from group
    await GroupModel.updateOne({ _id: new ObjectId(groupID) }, {
      $pull: {
        users: new ObjectId(userID)
      }
    })
  }
}