import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { Personal } from '../auth/guards/personal.decorator';
import { UserObjectID } from './user-object-id.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post('dev-create')
  // create(@Body() createUserDto: {

  // }): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }

  @Personal()
  @Get()
  getUser(@UserObjectID() userObjectID: string): Promise<UserDto> {
    return this.userService.findUserById(userObjectID);
  }
}
