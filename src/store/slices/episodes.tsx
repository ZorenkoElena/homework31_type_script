import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export interface IEpisod {
  id: number;
  name: string;
}

export interface Ipage {
  count: number;
}

interface IApiResponse {
  results: IEpisod[];
  info: Ipage;
}

export interface EpisodesState {
  isLoading: boolean;
  listOfEpisodes: IEpisod[];
  infoPage: Ipage | null;
  errorInListOfEpisodes: string | null | undefined;
}

export const episodeSlice = createSlice({
  name: 'episodes',
  initialState: {
    isLoading: false,
    listOfEpisodes: [],
    infoPage: null,
    errorInListOfEpisodes: null,
  } as EpisodesState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getListOfEpisodesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfEpisodesAsync.fulfilled, (state, action: PayloadAction<IApiResponse>) => {
      state.isLoading = false;
      state.listOfEpisodes = action.payload.results;
      state.infoPage = action.payload.info;
    });
    builder.addCase(getListOfEpisodesAsync.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errorInListOfEpisodes = action.payload.message;
    });
  },
});

export const getListOfEpisodesAsync = createAsyncThunk('episodes/fetchCharacters', async (page: number) => {
  const res: AxiosResponse = await axios(`episode?page=${page}`);
  const data = await res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
});

export default episodeSlice.reducer;
