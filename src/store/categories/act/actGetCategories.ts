import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("categories").select(`
    *,
    courses(*)
  `);

      if (error) {
        return rejectWithValue(error);
      }
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetCategories;
