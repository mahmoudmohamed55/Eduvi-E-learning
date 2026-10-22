import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseDashboard, TCourseFormValues } from "@types";
import { supabase } from "@utils/supabase";


interface TUpdateCoursePayload {
  id: string;
  data: TCourseFormValues;
}

const actUpdateCourse = createAsyncThunk<
  TCourseDashboard,
  TUpdateCoursePayload,
  { rejectValue: string }
>(
  "dashboard/courses/actUpdateCourse",
  async ({ id, data: course }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("courses")
      .update({
        ...course,
        thumbnail: course.thumbnail || null,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) return rejectWithValue(error.message);

    return data as TCourseDashboard;
  },
);

export default actUpdateCourse;