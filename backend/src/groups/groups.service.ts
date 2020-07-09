import { Injectable } from '@nestjs/common';
import { CreateGroupDto, GroupDto, CreateGroupSuccessDto, GetGroupsSuccessDto } from './group.dto';
import { UserModel, GroupModel } from '../mongoModels';
import { Group } from './group.schema';
import { convertToStrArr } from '../util/helperFunctions';

@Injectable()
export class GroupsService {

  async createGroup(creatorID: string, createGroupDto: CreateGroupDto): Promise<CreateGroupSuccessDto> {
    // TODO: add createGroupDto.users to new group, and add new group to those users

    const user = await UserModel.findById(creatorID);
    // add admins, users, posts and videos arrays to the CreateGroupDto
    const groupDoc = createGroupDto as unknown as Group;
    groupDoc.admins = [];
    groupDoc.users = [];
    groupDoc.posts = [];
    groupDoc.videos = [];

    const group = new GroupModel(groupDoc);
    // Add the creator as both admin and user
    group.admins.push(user);
    group.users.push(user);

    await group.save();

    // Add the group to the creator's list of groups
    user.groups.push(group);
    await user.save();
    return {
      _id: group._id.toString()
    }
  }

  leaveGroup(userID: string, groupID: string): Promise<void> {
    throw new Error("Method not implemented.");
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

  async getGroupById(groupID: string, memberID?: string): Promise<GroupDto> {
    throw new Error("Method not implemented.");
  }

  async joinGroup(userID: string, groupID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}