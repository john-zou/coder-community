import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/guards/user.guard';

@ApiTags('User')
@Controller('api/user')
export class UserController {
  @Get()
  @UseGuards(UserAuthGuard)
  test() {
    return 'Hello!';
  }
}
