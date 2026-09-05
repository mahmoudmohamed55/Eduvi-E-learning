import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";
import type { TCategory } from "@types";

export type TAddCategoryPayload = Omit<TCategory, "id" | "courses">;

const actAddCategory = createAsyncThunk<TCategory, TAddCategoryPayload>(
  "dashboard/categories/add",
  async (payload, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("categories")
      .insert(payload)
      .select()
      .single();

    if (error) return rejectWithValue(error.message);
    return data as TCategory;
  }
);

export default actAddCategory;