import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";


const actDeleteCourse = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "dashboard/courses/actDeleteCourse",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

export default actDeleteCourse;