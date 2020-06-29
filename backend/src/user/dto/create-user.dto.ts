import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  isLoggedIn: boolean;
  userID: string;
  name: string;
  profilePic: string;
  backgroundImg: string;
  status: string;
  followers: string[];
}