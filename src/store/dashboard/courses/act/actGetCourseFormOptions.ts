import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseFormOptions } from "@types";
import { supabase } from "@utils/supabase";


const actGetCourseFormOptions = createAsyncThunk<
  TCourseFormOptions,
  void,
  { rejectValue: string }
>(
  "dashboard/courses/actGetCourseFormOptions",
  async (_, { rejectWithValue }) => {
    const [categoriesResult, instructorsResult] = await Promise.all([
      supabase.from("categories").select("id, name").order("name"),
      supabase
        .from("profiles")
        .select("id, full_name")
        .eq("role", "instructor")
        .order("full_name"),
    ]);

    if (categoriesResult.error) {
      return rejectWithValue(categoriesResult.error.message);
    }

    if (instructorsResult.error) {
      return rejectWithValue(instructorsResult.error.message);
    }

    return {
      categories: categoriesResult.data ?? [],
      instructors: instructorsResult.data ?? [],
    };
  },
);

export default actGetCourseFormOptions;