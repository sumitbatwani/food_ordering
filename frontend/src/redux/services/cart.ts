import { CART, CART_ADD, CART_REMOVE } from "../apiEndPoints";
import { api } from "./api";

export const cartApiSlice: any = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => CART,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ item_id, quantity }) => ({
        url: `${CART_ADD}?item_id=${item_id}&quantity=${quantity}`,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error) => ["Cart"],
    }),
    removeFromCart: builder.mutation({
      query: ({ item_id, quantity }) => ({
        url: `${CART_REMOVE}?item_id=${item_id}&quantity=${quantity}`,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error) => ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApiSlice;
