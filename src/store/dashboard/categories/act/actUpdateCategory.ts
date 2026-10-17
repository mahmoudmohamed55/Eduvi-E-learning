import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategoryPayload, TDashboardCategory } from "@types";
import { supabase } from "@utils/supabase";


type TUpdateCategoryArgs = {
  id: string;
  category: TCategoryPayload;
};

export const actUpdateCategory = createAsyncThunk<
  TDashboardCategory,
  TUpdateCategoryArgs,
  { rejectValue: string }
>(
  "dashboard/categories/updateCategory",
  async ({ id, category }, thunkAPI) => {
    const { data, error } = await supabase
      .from("categories")
      .update(category)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return data as TDashboardCategory;
  },
);