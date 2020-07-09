import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from './user-object-id.decorator';
import { UserDto } from './dto/user.dto';

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
}
