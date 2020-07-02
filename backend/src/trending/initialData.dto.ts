import { GetInitialUserDataDto } from "../user/dto/user.dto";
import { GetInitialPostDataDto } from "../posts/dto/posts.dto";

//for redux intial state
export class InitialDataDto {
  user: GetInitialUserDataDto;
  posts: GetInitialPostDataDto[];
}
