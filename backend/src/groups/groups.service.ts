import { Injectable } from '@nestjs/common';
import { CreateGroupDto, CreateGroupSuccessDto, GetGroupSuccessDto } from './group.dto';
import { UserModel, GroupModel } from '../mongoModels';
import { Group } from './group.schema';
import { convertToStrArr } from '../util/helperFunctions';

@Injectable()
export class GroupsService {

  async createGroup(creatorID: string, createGroupDto: CreateGroupDto): Promise<CreateGroupSuccessDto> {
    const user = await UserModel.findById(creatorID);
    // add admins, users, posts and videos arrays to the CreateGroupDto
    const groupDoc = createGroupDto as Group;
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

  async getGroups(): Promise<GetGroupSuccessDto[]> {
    const allGroups = await GroupModel.find();
    return allGroups.map((group) => {
      return {
        _id: group._id.toString(),
        name: group.name,
        description: group.description,
        profilePic: group.profilePic,
        profileBanner: group.profileBanner,
        users: convertToStrArr(group.users),
        posts: convertToStrArr(group.posts),
        videos: convertToStrArr(group.videos),
      }
    })
  }

  async getGroupById(groupID: string, memberID?: string): Promise<GetGroupSuccessDto> {
    throw new Error("Method not implemented.");
  }

  async joinGroup(userID: string, groupID: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
