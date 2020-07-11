//GET USER DTO
//response
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  _id: string;
  userID: string;
  name: string;
  profilePic?: string;
  profileBanner?: string;
  status?: string;
  followers?: string[];
  following?: string[];
  groups?: string[];
  posts?: string[];
  savedPosts?: string[];
  likedPosts: string[];
}

export class GetUsersSuccessDto {
  users: UserDto[];
}

export class UpdateProfileReqDto {
  @ApiProperty({
    description: "Updated name",
    example: "Bill Gates"
  })
  name?: string;

  @ApiProperty(
    {
      description: "Updated status",
      example: "Learning React"
    }
  )
  status?: string;

  @ApiProperty(
    {
      description: "Array of tag ObjectIDs, which will completely replace the previous tags of the user",
    }
  )
  tags?: string[];
}