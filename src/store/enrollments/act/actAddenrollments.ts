import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@utils/supabase";

const actAddEnrollments = createAsyncThunk(
  "enrollments/actAddEnrollments",
  async (courseId: string, { rejectWithValue }) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return rejectWithValue(userError.message);
    }

    if (!user) {
      return rejectWithValue("User not found");
    }

    const { error } = await supabase.from("enrollments").insert({
      student_id: user.id,
      course_id: courseId,
    });

    if (error) {
      console.error("Error adding enrollment:", error);

      if (error.code === "23505") {
        return rejectWithValue("You are already enrolled in this course");
      }

      return rejectWithValue(error.message);
    }

    return courseId;
  }
);

export default actAddEnrollments;