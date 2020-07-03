import { ApiProperty } from '@nestjs/swagger';

export class GitHubLoginBody {
  code: string;
  state: string;
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

export class LoginSuccess {
  @ApiProperty({
    description: 'The CoderCommunity JWT',
  })
  jwt: string;

  @ApiProperty({
    description: 'The MongoDB user _id',
  })
  _id: string;

  @ApiProperty({
    description: 'The visible User ID',
    example: 'nick_lee'
  })
  userID: string;

  isNewUser: boolean;
}
