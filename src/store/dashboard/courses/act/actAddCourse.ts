import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseDashboard, TCourseFormValues } from "@types";
import { supabase } from "@utils/supabase";


const actAddCourse = createAsyncThunk<
  TCourseDashboard,
  TCourseFormValues,
  { rejectValue: string }
>(
  "dashboard/courses/actAddCourse",
  async (course, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("courses")
      .insert({
        ...course,
        thumbnail: course.thumbnail || null,
      })
      .select("*")
      .single();

    if (error) return rejectWithValue(error.message);

    return data as TCourseDashboard;
  },
);

export default actAddCourse;