import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import {
  CreateGroupSuccessDto,
  CreateGroupDto,
  GetGroupsSuccessDto,
  GroupDto,
  GetGroupMembersAndPostsDto,
} from './group.dto';
import { GroupsService } from './groups.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { };

  @Get('membersAndPosts/:groupID')
  getMembersAndPosts(@Param('groupID') groupID: string): Promise<GetGroupMembersAndPostsDto> {
    return this.groupsService.getMembersAndPosts(groupID);
  }

  @Get()
  getGroups(): Promise<GetGroupsSuccessDto> {
    return this.groupsService.getGroups();
  }

  @Get('/:id')
  getPublicGroup(@Param('id') groupID: string): Promise<GroupDto> {
    return this.groupsService.getGroupById(groupID);
  }

  @Personal()
  @Get(':privateId')
  getPrivateGroup(@UserObjectID() memberID: string, @Param('privateId') groupID: string): Promise<GroupDto> {
    return this.groupsService.getGroupById(groupID, memberID);
  }

  @Personal()
  @Post()
  createGroup(@UserObjectID() creatorID: string, @Body() dto: CreateGroupDto): Promise<CreateGroupSuccessDto> {
    return this.groupsService.createGroup(creatorID, dto);
  }

  @Personal()
  @Delete('leave/:id')
  leaveGroup(@UserObjectID() userID: string, @Param('id') groupID: string): Promise<void> {
    return this.groupsService.leaveGroup(userID, groupID);
  }

  @Personal()
  @Post('join/:id')
  joinGroup(@UserObjectID() userID: string, @Param('id') groupID: string): Promise<void> {
    return this.groupsService.joinGroup(userID, groupID);
  }

}