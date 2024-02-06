import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authService } from "../services/api/authService";
import authSlice from "./slices/authSlice";
import { holidazeApi } from "../services/api/holidazeApi";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [authService.reducerPath]: authService,
      [holidazeApi.reducerPath]: holidazeApi.reducer,
      authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authService.middleware, holidazeApi.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
