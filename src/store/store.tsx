import { configureStore } from '@reduxjs/toolkit';

import episodeSlice from './slices/episodes';
import heroSlice from './slices/heroes';

export const store = configureStore({
  reducer: {
    episodes: episodeSlice,
    heroes: heroSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
