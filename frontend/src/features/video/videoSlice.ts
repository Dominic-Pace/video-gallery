import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../../types/Video.type';

interface VideosState {
  list: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: VideosState = {
  list: [],
  loading: false,
  error: null,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setVideos, setLoading, setError } = videosSlice.actions;
export default videosSlice.reducer;