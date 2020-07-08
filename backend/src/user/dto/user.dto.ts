//GET USER DTO
//response
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