import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './heroSlice';

export const store = configureStore({
  reducer: {
    hero: heroReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionsPaths: [],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;