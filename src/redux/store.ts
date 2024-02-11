import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authService } from "../services/api/authService";
import auth from "./slices/authSlice";
import { holidazeApi } from "../services/api/holidazeApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk"; // Corrected import

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducers = combineReducers({
  [authService.reducerPath]: authService.reducer,
  [holidazeApi.reducerPath]: holidazeApi.reducer,
  auth,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

// Corrected spelling of ConfigureStoreOptions
export const createStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authService.middleware,
        holidazeApi.middleware,
        thunk, // Placed custom middleware before default
      ]),
  });

export const store = createStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
