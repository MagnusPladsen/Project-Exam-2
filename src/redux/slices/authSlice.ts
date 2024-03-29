import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { RootState } from "../store";

const auth = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | User;
    token: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
      return state;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
      return state;
    },
  },
  extraReducers: (
  ) => {},
});

export const { setCredentials, removeCredentials } = auth.actions;

export default auth.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => !!state.auth.token;
