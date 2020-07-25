import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from '../user/dto/user.dto';
import { PostDto } from '../posts/dto/posts.dto';

//CREATE GROUP
//request
export class CreateGroupDto {
  @ApiProperty({
    description: "The name of the group",
    example: "React Lovers United",
  })
  name: string;

  @ApiProperty({
    example: "We are hooked on unidirectional data flow!",
  })
  description?: string;

  //includes people who are added during group creation
  @ApiProperty({
    description: "The ObjectIDs of the invited users of the new group",
  })
  users: string[];

  @ApiProperty({
    description: "The URL for the group's circular profile avatar image",
    example: "http://images.com/react.png"
  })
  profilePic?: string;

  @ApiProperty({
    description: "The URL for the group's background image",
    example: "http://background.com/react-background.png"
  })
  profileBanner?: string;

  @ApiProperty({
    description: "Whether the group is viewable by non-members"
  })
  private: boolean;
}

//response
export class CreateGroupSuccessDto {
  @ApiProperty({
    description: "The newly created group's object ID"
  })
  _id: string;
}

//GET GROUP
export class GroupDto {
  _id: string;
  name: string;
  description: string;
  private: boolean;
  profilePic: string;
  profileBanner: string;
  admins: string[];
  users: string[];
  posts: string[];
  videos: string[];
  createdAt: string;
  updatedAt: string;
}

export class GetGroupsSuccessDto {
  groups: GroupDto[]
}

export class GetGroupMembersAndPostsDto {
  admins: UserDto[];
  users: UserDto[];
  posts: PostDto[];
}