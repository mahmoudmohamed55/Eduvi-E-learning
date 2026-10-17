import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";


export const actDeleteCategory = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("dashboard/categories/deleteCategory", async (id, thunkAPI) => {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return id;
});