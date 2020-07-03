import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.schema';
import { Personal } from '../auth/guards/personal.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post('dev-create')
  // create(@Body() createUserDto: {

  // }): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }

  // @Personal()
  // test(): string {
  //   return 'Hello!';
  // }
}
