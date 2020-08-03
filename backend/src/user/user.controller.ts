import { Controller, Get, Query, HttpException, Param, Put, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from './user-object-id.decorator';
import { UserDto, GetUsersSuccessDto, UpdateProfileReqDto } from './dto/user.dto';
import { UserModel } from '../mongoModels';

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger('UserController');
  constructor(private readonly userService: UserService) { }

  @Get('byUsername/:username')
  async getUserByUsername(@Param('username') username: string): Promise<UserDto> {
    return this.userService.findUserByUsername(username);
  }

  @ApiBearerAuth()
  @Personal()
  @Put('save-post/:postID')
  async savePost(@UserObjectID() userObjectID: string, @Param('postID') postID: string): Promise<void> {
    await this.userService.savePost(userObjectID, postID);
  }

  @ApiOperation({
    description: "Retrieve the current logged in user"
  })
  @ApiBearerAuth()
  @Personal()
  @Get()
  getUser(@UserObjectID() userObjectID: string): Promise<UserDto> {
    return this.userService.findUserById(userObjectID);
  }

  @ApiBearerAuth()
  @Personal()
  @Get('byIds')
  getUsersByIDs(@Query('ids') ids: string): Promise<GetUsersSuccessDto> {//@Query() returns the object {ids: string} while Query('ids') returns the string
    if (ids === "") {
      throw new HttpException('id string is empty', 400);
    }
    const idsArr = ids.split(',');
    return this.userService.findUsersByIds(idsArr);
  }

  @ApiBearerAuth()
  @Personal()
  @Get('followingFollowers')
  getFollowingFollowersOfUser(@UserObjectID() userObjectID: string): Promise<GetUsersSuccessDto> {
    return this.userService.getFollowingFollowersOfUser(userObjectID);
  }

  @ApiBearerAuth()
  @Personal()
  @Put('addFollowing/:id')
  //used to add to user's following
  async addFollowing(@UserObjectID() userObjectID: string, @Param('id') id: string): Promise<boolean> {
    this.logger.log(`addFollowing/${id} ...`);
    const addedFollowing = await this.userService.addFollowing(id, userObjectID);
    const addedFollower = await this.userService.addFollower(userObjectID, id);
    this.logger.log(`addFollowing/${id} Done!`);
    return addedFollowing && addedFollower;
  }

  @ApiBearerAuth()
  @Personal()
  @Put('removeFollowing/:id')
  async removeFollowing(@UserObjectID() userObjectID: string, @Param('id') id: string): Promise<boolean> {
    this.logger.log(`removeFollowing/${id} ...`);
    const removedFollowing = await this.userService.removeFollowing(id, userObjectID);
    const removedFollower = await this.userService.removeFollower(userObjectID, id);
    this.logger.log(`removeFollowing/${id} Done!`)
    return removedFollowing && removedFollower;
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
