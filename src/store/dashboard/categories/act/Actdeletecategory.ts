import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actDeleteCategory = createAsyncThunk<string, string>(
  "dashboard/categories/delete",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) return rejectWithValue(error.message);
    return id;
  }
);

export default actDeleteCategory;