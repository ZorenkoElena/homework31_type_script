import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

export interface IHero {
  id: number;
  name: string;
  status: string;
  image?: string;
  species?: string;
  gender?: string;
}

export interface Ipage {
  count: number;
}

interface IApiResponse {
  results: IHero[];
  info: Ipage;
}

export interface HeroesState {
  isLoading: boolean;
  listOfHeroes: IHero[];
  infoPage: Ipage | null;
  errorInListOfHeroes: string | null | undefined;
}

export const heroSlice = createSlice({
  name: 'heroes',
  initialState: {
    isLoading: false,
    listOfHeroes: [],
    infoPage: null,
    errorInListOfHeroes: null,
  } as HeroesState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getListOfHeroesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListOfHeroesAsync.fulfilled, (state, action: PayloadAction<IApiResponse>) => {
      state.isLoading = false;
      state.listOfHeroes = action.payload.results;
      state.infoPage = action.payload.info;
    });
    builder.addCase(getListOfHeroesAsync.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.errorInListOfHeroes = action.payload.message;
    });
  },
});

export const getListOfHeroesAsync = createAsyncThunk('heroes/fetchCharacters', async (page: number) => {
  const res: AxiosResponse = await axios(`character?page=${page}`);
  const data = await res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
});

export default heroSlice.reducer;
