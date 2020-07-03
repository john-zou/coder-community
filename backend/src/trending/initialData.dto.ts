import { UserDto } from "../user/dto/user.dto";
import { PostDto } from "../posts/dto/posts.dto";

//for redux intial state
export class GetInitialDataDto {
  posts: PostDto[];
  users: UserDto[];
}
export class GetInitialDataLoggedInDto {
  posts: PostDto[];
  users: UserDto[];
  user: UserDto;
}
