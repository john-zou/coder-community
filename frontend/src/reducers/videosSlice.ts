import { PayloadAction } from '@reduxjs/toolkit';
import { PostsApi, VideoApi, GetAllVideosDto, VideoDto } from './../api/api';
import { Video } from './../store/types';
import { createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';


const videosAdapter = createEntityAdapter<Video>({
  selectId: video => video._id,
})

export const getAllVideos = createAsyncThunk(
  'getAllVideosStatus',
  async () => {
    return await new VideoApi().videoControllerGetAllVideos();
  }
);

export const createVideo = createAsyncThunk(
  'createVideoStatus',
  async (video: any) => {
    const videoDto = { name: video.name, description: video.description };
    return await new VideoApi().videoControllerCreateVideo(videoDto);
  }
)

export const videosSlice = createSlice({
  name: 'video',
  initialState: videosAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [getAllVideos.fulfilled.type]: (state, action: PayloadAction<GetAllVideosDto>) => {
      const videosToAdd = action.payload.videos;
      videosAdapter.upsertMany(state, videosToAdd);
    },
    [createVideo.fulfilled.type]: (state, action: PayloadAction<VideoDto>) => {
      const video: Video = action.payload;
      videosAdapter.addOne(state, video);
    }
  }
})

export default videosSlice.reducer;