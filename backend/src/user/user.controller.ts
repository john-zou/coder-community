import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from './user-object-id.decorator';
import { UserDto, GetUsersSuccessDto } from './dto/user.dto';
import { Post } from '@typegoose/typegoose';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Personal()
  @Get()
  getUser(@UserObjectID() userObjectID: string): Promise<UserDto> {
    return this.userService.findUserById(userObjectID);
  }

  @Personal()
  @Get('byIds')
  getUsersByIDs(@Query('ids') ids: string): Promise<GetUsersSuccessDto> {
    if (ids === "") {
      throw new HttpException('id string is empty', 400);
    }
    const idsArr = ids.split(',');
    return this.userService.findUsersByIds(idsArr);
  }

  @Post()
  addFollowing(@Query() ):  
}
