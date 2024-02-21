import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";
import {
  Booking,
  CreateBookingRequest,
  CreateVenueRequest,
  UpdateVenueManagerStatusRequest,
  User,
  Venue,
} from "../../types/types";

// Define a service using a base URL and expected endpoints
export const holidazeApi = createApi({
  reducerPath: "holidazeApi",
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
  tagTypes: ["venues", "venue", "profile"],
  endpoints: (builder) => ({
    getLatestVenues: builder.query<Venue[], void>({
      query: () => "venues/?_owner=true&_bookings=true&sort=created",
      providesTags: ["venues"],
    }),
    getVenues: builder.query<Venue[], { limit: number; offset: number }>({
      query: ({ limit, offset }) =>
        `venues/?limit=${limit}&offset=${offset}&_owner=true&_bookings=true&sort=created`,
      providesTags: ["venues"],
    }),
    getSingleVenue: builder.query<Venue, string>({
      query: (id) => `venues/${id}?_owner=true&_bookings=true`,
    }),
    createVenue: builder.mutation<Venue, CreateVenueRequest>({
      query: (body) => ({
        url: `venues`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["venues", "profile"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
    updateVenue: builder.mutation<
      Venue,
      { body: CreateVenueRequest; id: string }
    >({
      query: ({ body, id }) => ({
        url: `venues/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["venues", "profile"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
    createBooking: builder.mutation<Booking, CreateBookingRequest>({
      query: (body) => ({
        url: "bookings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profile"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
    getProfile: builder.query<User, string>({
      query: (name) => `profiles/${name}?_bookings=true&_venues=true`,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
      providesTags: ["profile"],
    }),
    updateVenueManagerStatus: builder.mutation<
      User,
      UpdateVenueManagerStatusRequest
    >({
      query: ({ status, name }) => ({
        url: `profiles/${name}`,
        method: "PUT",
        body: { venueManager: status },
        invalidatesTags: ["profile"],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transformErrorResponse: (response: any) => {
          if (!response.ok) throw new Error(response.data.status);
          return response.json();
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLatestVenuesQuery,
  useGetVenuesQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useGetSingleVenueQuery,
  useLazyGetSingleVenueQuery,
  useCreateBookingMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} = holidazeApi;
