import { configureStore } from '@reduxjs/toolkit';
import mapSlice from '@/redux/slices/map.slice';

export const store = configureStore({
  reducer: {
    map: mapSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
