import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TDashboardCategory } from "@types";
import { supabase } from "@utils/supabase";



export const actGetCategories = createAsyncThunk<
  TDashboardCategory[],
  void,
  { rejectValue: string }
>("dashboard/categories/getCategories", async (_, thunkAPI) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data as TDashboardCategory[];
});