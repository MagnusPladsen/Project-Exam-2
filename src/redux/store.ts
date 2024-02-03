import { configureStore } from "@reduxjs/toolkit";
import venuesSlice from "./slices/venuesSlice";
import { combineReducers } from "redux";
import { holidazeApi } from "../services/api/holidazeApi";

export const store = configureStore({
  reducer: combineReducers({
    venues: venuesSlice,
    [holidazeApi.reducerPath]: holidazeApi.reducer,
  }),
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(holidazeApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
