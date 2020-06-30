import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  userID: string;
  name: string;
  profilePic: string;
  backgroundImg: string;
  status: string;
  followers: string[];
  followings: string[];
}