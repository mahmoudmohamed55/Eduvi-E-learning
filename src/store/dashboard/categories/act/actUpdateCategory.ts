import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";
import type { TCategory } from "@types";

export type TUpdateCategoryPayload = {
  id: string;
  payload: Partial<Omit<TCategory, "id" | "courses">>;
};

const actUpdateCategory = createAsyncThunk<TCategory, TUpdateCategoryPayload>(
  "dashboard/categories/update",
  async ({ id, payload }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("categories")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) return rejectWithValue(error.message);
    return data as TCategory;
  }
);

export default actUpdateCategory;