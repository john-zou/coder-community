import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/guards/user.guard';
import { UserService } from './user.service';
import { User } from './user.schema';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }

  @UseGuards(UserAuthGuard)
  test(): string {
    return 'Hello!';
  }
}
