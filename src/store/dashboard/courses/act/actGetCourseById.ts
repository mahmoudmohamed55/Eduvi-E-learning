import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseDashboard } from "@types";
import { supabase } from "@utils/supabase";


const actGetCourseById = createAsyncThunk<
  TCourseDashboard,
  string,
  { rejectValue: string }
>(
  "dashboard/courses/actGetCourseById",
  async (id, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return rejectWithValue(error.message);

    return data as TCourseDashboard;
  },
);

export default actGetCourseById;