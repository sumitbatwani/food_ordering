import { USERS } from "../apiEndPoints";
import { api } from "./api";

export const userApiSlice: any = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => USERS,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
