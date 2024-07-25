import { ORDERS } from "../apiEndPoints";
import { api } from "./api";

export const ordersApiSlice: any = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ORDERS,
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation({
      query: () => ({
        url: ORDERS,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Items", "Cart"],
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation } = ordersApiSlice;
