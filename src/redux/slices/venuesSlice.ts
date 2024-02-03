import { createSlice } from "@reduxjs/toolkit";

export interface VenueState {
  venues: Venue[];
  limit: number;
  offset: number;
}

const initialState: VenueState = {
  venues: [],
  limit: 5,
  offset: 0,
};

export const venuesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {}
});

// Action creators are generated for each case reducer function
export const {  } = venuesSlice.actions;

export default venuesSlice.reducer;
