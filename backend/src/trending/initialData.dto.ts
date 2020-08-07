import {UserDto} from "../user/dto/user.dto";
import {PostDto} from "../posts/dto/posts.dto";
import {TagsDto} from "../tags/tags.dto";

//for redux intial state
export class GetInitialDataDto {
    posts: PostDto[];
    users: UserDto[];
    tags: TagsDto[];
}

export class GetInitialDataLoggedInDto {
    posts: PostDto[];
    users: UserDto[];
    user: UserDto;
    tags: TagsDto[];
}
