import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actGetProfile = createAsyncThunk(
  "profile/actGetProfile",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return rejectWithValue("User not found");
      }

      // Profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      // Enrollments
      const { count: enrolledCourses, error: enrollmentsError } =
        await supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true })
          .eq("student_id", user.id);

      if (enrollmentsError) throw enrollmentsError;
      // Completed Lessons
      const { count: completedLessons, error: completedError } =
        await supabase
          .from("lesson_progress")
          .select("*", { count: "exact", head: true })
          .eq("student_id", user.id)
          .eq("completed", true);

      if (completedError) throw completedError;

      // Not Completed Lessons
      const { count: pendingLessons, error: pendingError } =
        await supabase
          .from("lesson_progress")
          .select("*", { count: "exact", head: true })
          .eq("student_id", user.id)
          .eq("completed", false);

      if (pendingError) throw pendingError;

      const totalLessons =
        (completedLessons ?? 0) + (pendingLessons ?? 0);

      const progress =
        totalLessons === 0
          ? 0
          : Math.round(((completedLessons ?? 0) / totalLessons) * 100);

      return {
        ...profile,
        enrolledCourses: enrolledCourses ?? 0,
        completedLessons: completedLessons ?? 0,
        pendingLessons: pendingLessons ?? 0,
        progress,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actGetProfile;