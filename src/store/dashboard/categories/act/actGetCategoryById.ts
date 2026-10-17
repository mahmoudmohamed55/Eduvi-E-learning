import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TDashboardCategory } from "@types";
import { supabase } from "@utils/supabase";


export const actGetCategoryById = createAsyncThunk<
  TDashboardCategory,
  string,
  { rejectValue: string }
>("dashboard/categories/getCategoryById", async (id, thunkAPI) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  if (!data) {
    return thunkAPI.rejectWithValue("Category not found.");
  }

  return data as TDashboardCategory;
});