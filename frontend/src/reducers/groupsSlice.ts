import { createEntityAdapter, createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Group, CurrentLoggedInUser } from "../store/types";
import { GroupsApi, GetGroupsSuccessDto, CreateGroupDto, CreateGroupSuccessDto } from "../api";
import { RootState } from "./rootReducer";

const groupsAdapter = createEntityAdapter<Group>({
  selectId: item => item._id
})

const api = new GroupsApi();
//https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchGroups = createAsyncThunk(
  'fetchGroups',
  async (_, { getState }) => {
    const groups: GetGroupsSuccessDto = await api.groupsControllerGetGroups();
    // console.log(groups);
    return groups;
  }
)

export const createGroup = createAsyncThunk(
  'createGroup',
  async (newGroup: CreateGroupDto, { getState }) => {
    const user = (getState() as RootState).user as CurrentLoggedInUser;
    const successDto = await api.groupsControllerCreateGroup(newGroup);
    return { ...newGroup, _id: successDto._id, admins: [user._id] };
  }
)

//https://redux-toolkit.js.org/api/createSlice
export const groupsSlice = createSlice({
  name: "groups",
  initialState: groupsAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [fetchGroups.fulfilled.type]: (state, action: PayloadAction<GetGroupsSuccessDto>) => {
      groupsAdapter.addMany(state, action.payload.groups) //add posts to ids and entities
    },
    [createGroup.fulfilled.type]: (state, action: PayloadAction<CreateGroupSuccessDto & CreateGroupDto & { admins: string[] }>) => {
      const { _id, name, private: _private, description, profileBanner, profilePic, admins } = action.payload;
      groupsAdapter.addOne(state, {
        _id, name, private: _private, description, profileBanner, profilePic,
        admins,
        users: [admins[0]],
        createdAt: Date.now().toLocaleString(),
        posts: [],
        updatedAt: Date.now().toLocaleString(),
        videos: []
      });
    }
  }
})

export default groupsSlice.reducer;