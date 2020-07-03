//GET USER DTO
//response
export class UserDto {
  _id: string;
  userID: string;
  name: string;
  profilePic?: string;
  likedPosts?: string[];
}