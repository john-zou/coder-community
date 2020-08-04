import { createEntityAdapter, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrendingPosts, fetchPostBySlug, fetchPostByID, fetchPostsByTag } from "./postsSlice";
import { User } from "../store/types";
import {
  GetInitialDataDto,
  GetInitialDataLoggedInDto,
  GetPostDetailsSuccessDto,
  UserApi,
  GetUsersSuccessDto,
  UserDto, GetGroupMembersAndPostsDto, GetPostsByTagDto
} from "../api";
import { leaveGroup, joinGroup, fetchGroupMembersAndPosts } from "./groupsSlice";
import _ from "lodash";
import { getCommentsByPostIDSuccess } from "./commentsSlice";
import { GetCommentsServerToClientDto } from "../ws-dto/comments/dto/getCommentsByPostID.ws.dto";
import { follow, unfollow, UserIDPayload } from "./userSlice";

const api = new UserApi();

const usersAdapter = createEntityAdapter<User>({
  selectId: item => item._id,
});

export const fetchUsersByIDs = createAsyncThunk('fetchUsersByIDs', async (IDs: string[]) => {
  return await api.userControllerGetUsersByIDs(IDs.join());
});

export const fetchUserByUsername = createAsyncThunk('fetchUserByUsername', async (username: string) => {
  return await api.userControllerGetUserByUsername(username);
})

export const getFollowingFollowersOfUser = createAsyncThunk(
  'getFollowingFollowersOfUser',
  async () => {
    return await api.userControllerGetFollowingFollowersOfUser()
  }
)

//https://redux-toolkit.js.org/api/createSlice
export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState<{ usernameToID: Record<string, string> }>(
    { usernameToID: {} }
  ),
  reducers: {

  },
  extraReducers: {
    [fetchTrendingPosts.fulfilled.type]: (state, action: PayloadAction<GetInitialDataDto | GetInitialDataLoggedInDto>) => {
      usersAdapter.addMany(state, action.payload.users) //add users (trending posts' authors) to ids and entities
      // Update username to ObjectID map
      action.payload.users.forEach(user => state.usernameToID[user.userID] = user._id);
    },
    [fetchPostsByTag.fulfilled.type]: (state, action: PayloadAction<GetPostsByTagDto>) => {
      usersAdapter.upsertMany(state, action.payload.authors);
      action.payload.authors.forEach(author => {
        state.usernameToID[author.userID] = author._id;
      })
    },
    [fetchPostBySlug.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      if (action.payload.author) {
        usersAdapter.upsertOne(state, action.payload.author);

        // Update username to ObjectID map
        state.usernameToID[action.payload.author.userID] = action.payload.author._id;
      }
    },
    [fetchPostByID.fulfilled.type]: (state, action: PayloadAction<GetPostDetailsSuccessDto>) => {
      console.log(action.payload);
      if (action.payload.author) {
        usersAdapter.upsertOne(state, action.payload.author);

        // Update username to ObjectID map
        state.usernameToID[action.payload.author.userID] = action.payload.author._id;
      }
    },
    [fetchUsersByIDs.fulfilled.type]: (state, action: PayloadAction<GetUsersSuccessDto>) => {
      usersAdapter.upsertMany(state, action.payload.users);
      // Update username to ObjectID map
      action.payload.users.forEach(user => state.usernameToID[user.userID] = user._id);
    },
    [fetchUserByUsername.fulfilled.type]: (state, action: PayloadAction<UserDto>) => {
      usersAdapter.upsertOne(state, action.payload);
      // Update username to ObjectID map
      state.usernameToID[action.payload.userID] = action.payload._id;
    },
    [leaveGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      if (state.entities[action.payload.userID]) {
        _.pull(state.entities[action.payload.userID].groups, action.payload.groupID);
      }
    },
    [joinGroup.fulfilled.type]: (state, action: PayloadAction<{ groupID: string, userID: string }>) => {
      if (state.entities[action.payload.userID].groups) {
        state.entities[action.payload.userID].groups.push(action.payload.groupID)
      }
    },
    'getConversationsAndUsers': (state, action: PayloadAction<any>) => {
      usersAdapter.upsertMany(state, action.payload.users);
    },
    [getCommentsByPostIDSuccess.type]: (state, action: PayloadAction<GetCommentsServerToClientDto>) => {
      usersAdapter.upsertMany(state, action.payload.authors);
    },
    [getFollowingFollowersOfUser.fulfilled.type]: (state, action: PayloadAction<GetUsersSuccessDto>) => {
      usersAdapter.upsertMany(state, action.payload.users);
    },
    [follow.type]: (state, action: PayloadAction<UserIDPayload>) => {
      const otherID = action.payload.otherUserID;
      state.entities[otherID].followers.push(action.payload.currentUserID);
    },
    [unfollow.type]: (state, action: PayloadAction<UserIDPayload>) => {
      const otherID = action.payload.otherUserID;
      _.pull(state.entities[otherID].followers, action.payload.currentUserID)
    },
    [fetchGroupMembersAndPosts.fulfilled.type]: (state, action: PayloadAction<GetGroupMembersAndPostsDto>) => {
      usersAdapter.upsertMany(state, action.payload.admins)
      usersAdapter.upsertMany(state, action.payload.users)
    }
  }
})

export default usersSlice.reducer;