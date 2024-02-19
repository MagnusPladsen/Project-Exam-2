import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { selectToken } from "../../redux/slices/authSlice";
import { Booking, CreateBookingRequest, User, Venue } from "../../types/types";
import { RootState } from "../../redux/store";

// Define a service using a base URL and expected endpoints
export const holidazeApi = createApi({
  reducerPath: "organizerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.noroff.dev/api/v1/holidaze/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["venues"],
  endpoints: (builder) => ({
    getLatestVenues: builder.query<Venue[], void>({
      query: () => "venues/?limit=5&offset=0&_owner=true&_bookings=true`",
      providesTags: ["venues"],
    }),
    getVenues: builder.query<Venue[], { limit: number; offset: number }>({
      query: ({ limit, offset }) =>
        `venues/?limit=${limit}&offset=${offset}&_owner=true&_bookings=true`,
      providesTags: ["venues"],
    }),
    getSingleVenue: builder.query<Venue, string>({
      query: (id) => `venues/${id}?_owner=true&_bookings=true`,
    }),
    createVenue: builder.mutation<Venue, Partial<Venue>>({
      query: (body) => ({
        url: `venues`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["venues"],
    }),
    createBooking: builder.mutation<Booking, CreateBookingRequest>({
      query: (body) => ({
        url: "bookings",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLatestVenuesQuery,
  useGetVenuesQuery,
  useCreateVenueMutation,
  useGetSingleVenueQuery,
  useCreateBookingMutation
} = holidazeApi;
