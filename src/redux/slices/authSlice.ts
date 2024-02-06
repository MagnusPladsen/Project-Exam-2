import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | any;
    token: null | string;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    }
  },
  extraReducers: (builder) => {}
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
