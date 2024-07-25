import { generatePath } from "react-router-dom";
import {
  ITEMS,
  ITEMS_BY_CATEGORY,
  ITEMS_CATEGORIES,
  ITEMS_CATEGORY_SEARCH,
} from "../apiEndPoints";
import { api } from "./api";

export const itemsApiSlice: any = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ITEMS,
      providesTags: ["Items"],
    }),
    getItemByCategory: builder.query({
      query: ({ category_id }: { category_id: string }) =>
        generatePath(ITEMS_BY_CATEGORY, { category_id }),
    }),
    getItemCategories: builder.query({
      query: () => ITEMS_CATEGORIES,
    }),
    getItemCategorySearch: builder.query({
      query: ({ search }) => `${ITEMS_CATEGORY_SEARCH}?query=${search}`,
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByCategoryQuery,
  useGetItemCategoriesQuery,
  useGetItemCategorySearchQuery,
} = itemsApiSlice;
