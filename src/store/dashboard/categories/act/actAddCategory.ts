import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategoryPayload, TDashboardCategory } from "@types";
import { supabase } from "@utils/supabase";


export const actAddCategory = createAsyncThunk<
  TDashboardCategory,
  TCategoryPayload,
  { rejectValue: string }
>("dashboard/categories/addCategory", async (category, thunkAPI) => {
  const { data, error } = await supabase
    .from("categories")
    .insert(category)
    .select("*")
    .single();

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data as TDashboardCategory;
});