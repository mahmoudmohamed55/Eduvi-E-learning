import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@utils/supabase";

const actGetEnrollments = createAsyncThunk(
  "enrollments/actGetEnrollments",
  async (_, { rejectWithValue }) => {
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

    const { data, error } = await supabase
      .from("enrollments")
      .select(
        `
        id,
        created_at,
        course:courses (
          id,
          created_at,
          title,
          slug,
          description,
          thumbnail,
          price,
          category_id,
          instructor_id,
          level,
          rate,
          instructor:profiles (
            id,
            full_name,
            avatar
          )
        )
      `,
      )
      .eq("student_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching enrollments:", error);
      return rejectWithValue(error.message);
    }

    const courses = data.flatMap((enrollment) => enrollment.course);

    return courses;
  },
);

export default actGetEnrollments;
