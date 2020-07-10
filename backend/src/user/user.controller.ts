import { Controller, Get, Query, HttpException, Param, Put, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from './user-object-id.decorator';
import { UserDto, GetUsersSuccessDto, UpdateProfileReqDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {  }

  @ApiBearerAuth()
  @Personal()
  @Put('save-post/:postID')
  async savePost(@UserObjectID() userObjectID: string, @Param('postID') postID: string): Promise<void> {
    await this.userService.savePost(userObjectID, postID);
  }

  @ApiBearerAuth()
  @Personal()
  @Get()
  getUser(@UserObjectID() userObjectID: string): Promise<UserDto> {
    return this.userService.findUserById(userObjectID);
  }

  @ApiBearerAuth()
  @Personal()
  @Get('byIds')
  //used in add people to groups
  getUsersByIDs(@Query('ids') ids: string): Promise<GetUsersSuccessDto> {//@Query() returns the object {ids: string} while Query('ids') returns the string
    if (ids === "") {
      throw new HttpException('id string is empty', 400);
    }
    const idsArr = ids.split(',');
    return this.userService.findUsersByIds(idsArr);
  }

  @ApiBearerAuth()
  @Personal()
  @Put('addFollowing/:id')
  //used to add to user's following
  addFollowing(@UserObjectID() userObjectID: string, @Param('id') id: string): Promise<boolean> {
    return this.userService.addFollowing(userObjectID, id);
  }

  @ApiBearerAuth()
  @Personal()
  @Put('addFollower/:id')
  addFollower(@UserObjectID() userObjectID: string, @Param('id') id: string): Promise<boolean> {
    return this.userService.addFollower(userObjectID, id);
  }

  @ApiOperation({
    description: "For updating user's name, status and tags. To update profile image or banner image, use their upload endpoints instead."
  })
  @ApiBearerAuth()
  @Personal()
  @Put('edit-profile')
  editProfile(@UserObjectID() userObjectID: string, @Body() updateProfileDto: UpdateProfileReqDto): Promise<void> {
    return this.userService.updateProfile(userObjectID, updateProfileDto);
  }
}
