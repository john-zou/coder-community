export type Attachment = {
  _id: string,
  url: string,
  fileType: string,
  extension: string,
  createdAt: string,
  updatedAt: string,
}

export type Comment = {
  _id: string,
  author: string,
  content: string,
  replies: string[], //list of comment ids
  commentRoot: string,
  likes: string[],
  likesCount: string,
  parentPost: string,
  parentComment: string,
  parentVideo: string,
  createdAt: string,
  updatedAt: string,
}

export type Conversation = {
  _id: string,
  name: string,
  users: string[],
  messages: string[],
  createdAt: string,
  updatedAt: string,
}

export type Group = {
  _id: string,
  name: string,
  profilePic: string,
  profileBanner: string,
  users: string[],
  posts: string[],
  videos: string[],
  createdAt: string,
  updatedAt: string,
};

export type Message = {
  _id: string,
  author: string,
  text: string,
  attachments: string[],
  createdAt: string,
  updatedAt: string,
};

export type Post = {
  _id: string,
  author: string,
  title: string,
  previewContent: string,
  content: string,
  tags: string[],
  featuredImg: string,
  likesCount: number,
  comments: string[],
  commentsCount: number,
  views: number,
  createdAt: string,
  likedByUser: boolean,
  slug: string,
  group?: string,
}

export type Tag = {
  _id: string,
  name: string,
  posts: string[],
  createdAt: string,
  updatedAt: string,
};

export type User = {
  _id: string,
  userID?: string,
  gitHubID: number,
  name: string,
  profilePic: string,
  profileBanner?: string,
  status?: string,
  followers?: string[],//list of ids
  following?: string[],
  groups?: string[],
  savedPosts: string[],
  likedPosts: string[],
  tags: string[],
  conversations: string[],
  lastLoggedIn: string,
  createdAt: string,
  updatedAt: string,
};

export type Video = {
  _id: string,
  author: string,
  name: string,
  description: string,
  likesCount: number,
  commentsCount: number,
  comments: string[],
  createdAt: string,
  updatedAt: string,
};

export type IsLoggedIn = boolean;

export type RootState = {
  isLoggedIn: false,
  //cache -small version of mongodb in which each item is a map from ObjectID to appropriate data type
  attachments: Record<string, Attachment>,
  comments: Record<string, Comment>,
  conversations: Record<string, Conversation>,
  groups: Record<string, Group>,
  messages: Record<string, Message>,
  posts: Record<string, Post>,
  tags: Record<string, Tag>,
  users: Record<string, User>,
  video: Record<string, Video>,

  //redux store (contains references to the info stored in the cache above), 
  //the front end will first look up in the cache, if it doesn't find sth then ask the backend
  user: User,
  trendingPosts: string[],
  userOwnPosts: string[],
  trendingVideos: string[],
  likedByUser: false,
  savedPosts: string[],
};

export default RootState;