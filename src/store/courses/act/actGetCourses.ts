import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const PAGE_SIZE = 6;

const actGetCourses = createAsyncThunk(
  "courses/getCourses",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("courses")
        .select(
          `
            *,
            instructor:profiles(
              full_name,
              avatar
            )
          `,
          { count: "exact" }
        )
        .range(from, to);

      if (error) throw error;

      return {
        courses: data,
        total: count ?? 0,
      };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export default actGetCourses;