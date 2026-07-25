import { createSlice } from "@reduxjs/toolkit";
import type { TCategory, TLoading } from "@types";
import actGetCategories from "./act/actGetCategories";

interface CategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: CategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload || [];
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});
export default categoriesSlice.reducer;

export const { clearCategories } = categoriesSlice.actions;