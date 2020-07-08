import { Ref, DocumentType } from "@typegoose/typegoose";
import { ObjectID } from "mongodb";
import { UserDto } from "../user/dto/user.dto";
import { User } from "../user/user.schema";

export const convertToStrArr = (list: Ref<any, ObjectID>): string[] => {
  return list.map((item) => {
    return item.toString();
  })
}

export const convertUserToUserDto = (user: DocumentType<User>): UserDto => {
  return {
    _id: user._id,
    userID: user.userID,
    name: user.name,
    profilePic: user.profilePic,
    profileBanner: user.profileBanner,
    status: user.status,
    followers: convertToStrArr(user.followers),
    following: convertToStrArr(user.following),
    groups: convertToStrArr(user.groups),
    posts: convertToStrArr(user.posts),
    savedPosts: convertToStrArr(user.savedPosts),
    likedPosts: convertToStrArr(user.likedPosts),
  }
}