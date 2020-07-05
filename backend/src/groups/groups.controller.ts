import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from '../user/user-object-id.decorator';
import { CreateGroupSuccessDto, CreateGroupDto, GetGroupSuccessDto } from './group.dto';
import { GroupsService } from './groups.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { };

  @Get()
  getGroups(): Promise<GetGroupSuccessDto[]> {
    return this.groupsService.getGroups();
  }

  @Get(':id')
  getPublicGroup(@Param('id') groupID: string): Promise<GetGroupSuccessDto> {
    return this.groupsService.getGroupById(groupID);
  }

  @Personal()
  @Get(':id')
  getPrivateGroup(@UserObjectID() memberID: string, @Param('id') groupID: string): Promise<GetGroupSuccessDto> {
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
