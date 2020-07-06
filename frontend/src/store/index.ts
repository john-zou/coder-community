import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';


const store = configureStore({
  reducer: rootReducer
})

export default store;

/*
export type AttachmentsState = Record<string, Loadable<Attachment>>;
export type CommentsState = Record<string, Loadable<Comment>>;
export type ConversationsState = Record<string, Loadable<Conversation>>;
export type GroupsState = Record<string, Loadable<Group>>;
export type MessagesState = Record<string, Loadable<Message>>;
export type PostsState = Record<string, Loadable<Post>>;
export type PostsCreationState = { title: '', content: '', tags: [] };
export type TagsState = Record<string, Loadable<Tag>>;
export type UsersState = Record<string, Loadable<User>>;
export type VideosState = Record<string, Loadable<Video>>;

export type RootState = {
  isLoggedIn: boolean,
  postsCreation: PostsCreation,

  //cache -small version of mongodb in which each item is a map from ObjectID to appropriate data type
  attachments: Record<string, Loadable<Attachment>>,
  comments: Record<string, Loadable<Comment>>,
  conversations: Record<string, Loadable<Conversation>>,
  groups: Record<string, Loadable<Group>>,
  messages: Record<string, Loadable<Message>>,
  posts: Record<string, Loadable<Post>>,
  tags: Record<string, Loadable<Tag>>,
  users: Record<string, Loadable<User>>,
  videos: Record<string, Loadable<Video>>,

  //mapping of post slug to post ObjectID
  slugs: Record<string, string>,
  //mapping of user ID to user ObjectID
  userIDs: Record<string, string>,

  //redux store (contains references to the info stored in the cache above), 
  //the front end will first look up in the cache, if it doesn't find sth then ask the backend
  user: Loadable<User>,
  trendingPosts: LoadableIDs,
  userOwnPosts: LoadableIDs,
  trendingVideos: LoadableIDs,
  savedPosts: LoadableIDs,
};

export default RootState;
 */
