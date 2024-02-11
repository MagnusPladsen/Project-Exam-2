import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as thunk from "redux-thunk";
import { authService } from "../services/api/authService";
import { holidazeApi } from "../services/api/holidazeApi";
import auth from "./slices/authSlice";

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

// fixed the issue with the non-serializable value
const nonSerializableCheckMiddleware: Middleware =
  (store) => (next) => (action: any) => {
    if (action.type === "persist/PERSIST") {
      // Exclude specific actions from the check
      return next(action);
    }
    return next(action);
  };

export const createStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"], // Ignore specific actions
        },
      }).concat([
        authService.middleware,
        holidazeApi.middleware,
        thunk.thunk,
        nonSerializableCheckMiddleware,
      ]),
  });

export const store = createStore();
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
function createLogger() {
  throw new Error("Function not implemented.");
}
