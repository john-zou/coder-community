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

export type Conversation = {
  _id: string,
  name: string,
  users: LoadableIDs,
  messages: LoadableIDs,
  createdAt: string,
  updatedAt: string,
}

export type Group = {
  _id: string,
  name: string,
  profilePic: string,
  profileBanner: string,
  users: LoadableIDs,
  posts: LoadableIDs,
  videos: LoadableIDs,
  createdAt: string,
  updatedAt: string,
};

export type Message = {
  _id: string,
  author: string,
  text: string,
  attachments: LoadableIDs,
  createdAt: string,
  updatedAt: string,
};

export type Post = {
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

export type Tag = {
  _id: string,
  name: string,
  posts: LoadableIDs,
};

export type User = {
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

export type Video = {
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

export type AttachmentsState = Record<string, Loadable<Attachment>>;
export type CommentsState = Record<string, Loadable<Comment>>;
export type ConversationsState = Record<string, Loadable<Conversation>>;
export type GroupsState = Record<string, Loadable<Group>>;
export type MessagesState = Record<string, Loadable<Message>>;
export type PostsState = Record<string, Loadable<Post>>;
export type TagsState = Record<string, Loadable<Tag>>;
export type UsersState = Record<string, Loadable<User>>;
export type VideosState = Record<string, Loadable<Video>>;

export type RootState = {
  isLoggedIn: boolean,

  //cache -small version of mongodb in which each item is a map from ObjectID to appropriate data type
  // attachments: Record<string, Loadable<Attachment>>,
  // comments: Record<string, Loadable<Comment>>,
  // conversations: Record<string, Loadable<Conversation>>,
  // groups: Record<string, Loadable<Group>>,
  // messages: Record<string, Loadable<Message>>,
  // posts: Record<string, Loadable<Post>>,
  // tags: Record<string, Loadable<Tag>>,
  // users: Record<string, Loadable<User>>,
  // videos: Record<string, Loadable<Video>>,

  //mapping of post slug to post ObjectID
  slugs: Record<string, string>,
  //mapping of user ID to user ObjectID
  userIDs: Record<string, string>,

  //redux store (contains references to the info stored in the cache above), 
  //the front end will first look up in the cache, if it doesn't find sth then ask the backend
  // user: Loadable<User>,
  // trendingPosts: LoadableIDs,
  // userOwnPosts: LoadableIDs,
  // trendingVideos: LoadableIDs,
  // savedPosts: LoadableIDs,
};

export default RootState;