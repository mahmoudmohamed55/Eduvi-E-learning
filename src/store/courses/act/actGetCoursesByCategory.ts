import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actGetCoursesByCategory = createAsyncThunk(
  "courses/getCoursesByCategory",
  async (slug: string, { rejectWithValue }) => {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (categoryError) {
      return rejectWithValue(categoryError);
    }

    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select(
        `
    *,
    instructor:profiles(
      full_name,
      avatar
    )
  `,
      )
      .eq("category_id", categoryData.id);

    if (coursesError) {
      return rejectWithValue(coursesError);
    }
  
    return courses;
  },
);

export default actGetCoursesByCategory;
