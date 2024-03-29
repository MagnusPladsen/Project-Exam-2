import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";
import {
  Booking,
  CreateBookingRequest,
  CreateVenueRequest,
  ErrorResponse,
  SortOrder,
  UpdateProfileMediaRequest,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
    }),
    getVenues: builder.query<
      Venue[],
      { limit: number; offset: number; sortOrder: SortOrder }
    >({
      query: ({ limit, offset, sortOrder }) =>
        `venues/?limit=${limit}&offset=${offset}&_owner=true&_bookings=true&sort=created&sortOrder=${sortOrder}`,
      providesTags: ["venues"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
    }),
    getSingleVenue: builder.query<Venue, string>({
      query: (id) => `venues/${id}?_owner=true&_bookings=true`,
      providesTags: ["venue"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
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
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
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
      invalidatesTags: ["venues", "profile", "venue"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
    }),
    deleteVenue: builder.mutation<Venue, string>({
      query: (id) => ({
        url: `venues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["venues", "profile"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
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
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
    }),
    getProfile: builder.query<User, string>({
      query: (name) => `profiles/${name}?_bookings=true&_venues=true`,
      providesTags: ["profile"],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformErrorResponse: (response: any) => {
        if (!response.ok)
          throw new Error((response as ErrorResponse).data.errors[0].message);
        return response.json();
      },
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
          if (!response.ok)
            throw new Error((response as ErrorResponse).data.errors[0].message);
          return response.json();
        },
      }),
    }),
    updateProfileMediaStatus: builder.mutation<User, UpdateProfileMediaRequest>(
      {
        query: ({ avatar, name }) => ({
          url: `profiles/${name}/media`,
          method: "PUT",
          body: { avatar },
          invalidatesTags: ["profile"],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          transformErrorResponse: (response: any) => {
            if (!response.ok)
              throw new Error(
                (response as ErrorResponse).data.errors[0].message
              );
            return response.json();
          },
        }),
      }
    ),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetLatestVenuesQuery,
  useGetVenuesQuery,
  useLazyGetVenuesQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useUpdateProfileMediaStatusMutation,
  useDeleteVenueMutation,
  useGetSingleVenueQuery,
  useLazyGetSingleVenueQuery,
  useCreateBookingMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} = holidazeApi;
