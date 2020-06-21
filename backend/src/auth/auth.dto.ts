import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export class GitHubLoginBody {
  code: string;
}

export class GoogleLoginBody {
  // TODO
}

export class LogOut {
  // TODO
}

export class LogOutSuccess {
  // TODO
}

export type LoginMethod = 'GitHub' | 'Google';

export class LoginSuccess {
  @ApiProperty({
    description: 'The CoderCommunity JWT',
  })
  jwt: string;

  @ApiProperty({
    example: 'nick-lee',
  })
  userID: string;

  isNewUser: boolean;

  @ApiProperty({
    example: 'GitHub',
  })
  loginMethod: LoginMethod;
}
