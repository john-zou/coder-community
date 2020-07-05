export type Loadable<T> = {
  loading: boolean;
  error?: Error;
  item?: T;
}

export type LoadableIDs = {
  loading: boolean;
  error?: Error;
  items?: string[];
}

export interface Entity { }

export interface Attachment extends Entity {
  _id: string,
  url: string,
  fileType: string,
  extension: string,
  createdAt: string,
  updatedAt: string,
}

export interface Comment extends Entity {
  _id: string,
  author: string,
  content: string,
  replies: LoadableIDs, //list of comment ids
  commentRoot: string,
  likes: LoadableIDs,
  likesCount: number,
  parentPost: string,
  parentComment: string,
  parentVideo: string,
  createdAt: string,
  updatedAt: string,
}

export interface Conversation extends Entity {
  _id: string,
  name: string,
  users: LoadableIDs,
  messages: LoadableIDs,
  createdAt: string,
  updatedAt: string,
}

export interface Group extends Entity {
  _id: string,
  name: string,
  description: string,
  profilePic: string,
  profileBanner: string,
  users: LoadableIDs,
  posts: LoadableIDs,
  videos: LoadableIDs,
  createdAt: string,
  updatedAt: string,
};

export interface Message extends Entity {
  _id: string,
  author: string,
  text: string,
  attachments: LoadableIDs,
  createdAt: string,
  updatedAt: string,
};

export interface Post extends Entity {
  _id: string,
  author: string,
  title: string,
  previewContent: string,
  content: string,
  tags: LoadableIDs,
  featuredImg: string,
  likesCount: number,
  comments: LoadableIDs,
  commentsCount: number,
  views: number,
  createdAt: string,
  likedByUser: boolean,
  slug: string,
  group?: string,
}

export interface Tag extends Entity {
  _id: string,
  name: string,
  posts: LoadableIDs,
};

export interface User extends Entity {
  _id: string,
  userID: string,
  gitHubID?: number,
  name: string,
  profilePic: string,
  profileBanner?: string,
  status?: string,
  followers?: LoadableIDs,//list of ids
  following?: LoadableIDs,
  groups?: LoadableIDs,
  posts?: LoadableIDs,
  savedPosts?: LoadableIDs,
  likedPosts?: LoadableIDs,
  tags?: LoadableIDs,
  conversations?: LoadableIDs,
  lastLoggedIn?: string,
  createdAt?: string,
  updatedAt?: string,
};

export interface Video extends Entity {
  _id: string,
  author: string,
  name: string,
  description: string,
  likesCount: number,
  commentsCount: number,
  comments: LoadableIDs,
  createdAt: string,
  updatedAt: string,
};

// Removed for simplification:
// export type AttachmentsState = Record<string, Attachment>;
// export type CommentsState = Record<string, Comment>;
// export type ConversationsState = Record<string, Conversation>;
// export type GroupsState = Record<string, Group>;
// export type MessagesState = Record<string, Message>;
// export type PostsState = Record<string, Post>;
// export type TagsState = Record<string, Tag>;
// export type UsersState = Record<string, User>;
// export type VideosState = Record<string, Video>;

export enum SelectedTab {
  GROUPS = "groups",
  MESSAGES = "messages",
  POSTS = "posts",
  VIDEOS = "videos",
  DEFAULT = "default"
}

export type RootState = {
  isLoggedIn: boolean,
  selectedTab: SelectedTab,

  //cache -small version of mongodb in which each item is a map from ObjectID to a MongoDB Document
  cache: Record<string, Entity>,

  //mapping of post slug to post ObjectID
  slugs: Record<string, string>,
  //mapping of user ID to user ObjectID
  userIDs: Record<string, string>,

  //redux store (contains references to the info stored in the cache above), 
  //the front end will first look up in the cache, if it doesn't find sth then ask the backend
  user: Loadable<User>,
  trendingPosts: LoadableIDs,
  browsingGroups: LoadableIDs,
  userOwnPosts: LoadableIDs,
  trendingVideos: LoadableIDs,
  savedPosts: LoadableIDs,
};

export default RootState;