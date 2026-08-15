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
        console.log("Categories Error:", error);
        return rejectWithValue(error.message);
      }

      console.log("Categories Data:", data);

      return data;
    } catch (error) {
      console.log("Categories Catch Error:", error);

      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  },
);

export default actGetCategories;
