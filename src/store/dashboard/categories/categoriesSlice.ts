import { createSlice } from "@reduxjs/toolkit";

import { actGetCategories } from "./act/actGetCategories";
import { actAddCategory } from "./act/actAddCategory";
import { actUpdateCategory } from "./act/actUpdateCategory";
import type { TDashboardCategory } from "@types";
import { actDeleteCategory } from "./act/Actdeletecategory";


type TCategoriesState = {
  categories: TDashboardCategory[];
  loading: boolean;
  error: string | null;
};

const initialState: TCategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "dashboardCategories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GET CATEGORIES
    builder
      .addCase(actGetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load categories";
      });

    // ADD CATEGORY
    builder
      .addCase(actAddCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actAddCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload);
      })
      .addCase(actAddCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add category";
      });

    // UPDATE CATEGORY
    builder
      .addCase(actUpdateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actUpdateCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(actUpdateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update category";
      });

    // DELETE CATEGORY
    builder
      .addCase(actDeleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actDeleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = state.categories.filter(
          (category) => category.id !== action.payload,
        );
      })
      .addCase(actDeleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete category";
      });
  },
});

export default categoriesSlice.reducer;