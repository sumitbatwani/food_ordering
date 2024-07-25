import qs from "qs";
import { API_CACHING_TAGS } from "../../constants/api";
import { LOGIN, REGISTER } from "../apiEndPoints";
import { setAuthToken } from "../features/authSlice";
import { api } from "./api";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: LOGIN,
        method: "POST",
        body: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }),
      transformResponse: (response: any) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuthToken(data.access_token));
          dispatch(api.util.invalidateTags(API_CACHING_TAGS));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: builder.mutation({
      query: (userDetails) => ({
        url: REGISTER,
        method: "POST",
        body: userDetails,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
