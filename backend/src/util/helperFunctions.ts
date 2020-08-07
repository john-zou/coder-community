import {DocumentType, Ref} from "@typegoose/typegoose";
import {ObjectID} from "mongodb";
import {UserDto} from "../user/dto/user.dto";
import {User} from "../user/user.schema";
import {Post} from "../posts/post.schema";
import {PostDto, PostWithDetails} from '../posts/dto/posts.dto';
import * as moment from 'moment';

export const convertToStrArr = (list: Ref<any, ObjectID>[]): string[] => {
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

export const convertPostDocumentToPostDto = (post: DocumentType<Post>): PostDto => {
    let createdAt: string;
    const dateCopy = new Date(post.createdAt.getTime());
    const nowHours = Date.now() / (1000 * 60 * 60);
    const postCreateAtHours = post.createdAt.getTime() / (1000 * 60 * 60);
    if (nowHours - postCreateAtHours > 24) {
        createdAt = moment(dateCopy).format('lll'); //https://momentjs.com/
    } else {
        createdAt = moment(dateCopy).fromNow(); //https://momentjs.com/docs/#/displaying/fromnow/
    }
    // Logger.log(createdAt, "convertPostDocumentToPostDto");
    return {
        _id: post._id.toString(),
        author: post.author.toString(),
        title: post.title,
        slug: post.slug,
        previewContent: post.previewContent,
        content: post.content,
        tags: convertToStrArr(post.tags),
        createdAt,
        updatedAt: post.updatedAt.toString(), // Not very useful as it updates upon view increment
        featuredImg: post.featuredImg,
        likes: post.likes,
        views: post.views,
        comments: convertToStrArr(post.comments),
        commentsCount: post.comments.length,
    }
}

// Unused
export const convertPostDocumentToPostDetailDto = (post: DocumentType<Post>): PostWithDetails => {
    return {
        _id: post._id,
        author: post.author.toString(),
        comments: convertToStrArr(post.comments),
        commentsCount: post.comments.length,
        content: post.content,
        createdAt: post.createdAt.toString(),
        updatedAt: post.updatedAt.toString(),
        featuredImg: post.featuredImg,
        likes: post.likes,
        previewContent: post.previewContent,
        slug: post.slug,
        tags: convertToStrArr(post.tags),
        title: post.title,
        views: post.views,
        group: post.group?.toString(),
    }
}


export const createConversationNameFromNamesOfUsers = (namesOfUsers: string[]): string => {
    let name = "";
    for (let i = 0; i < namesOfUsers.length; ++i) {
        name += namesOfUsers[i];
        if (i === namesOfUsers.length - 1) {
            return name;
        }
        name += ", ";
    }
}
