import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (courseId: string, { rejectWithValue }) => {
    try {

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        return rejectWithValue(userError.message);
      }

      if (!user) {
        return rejectWithValue("User is not authenticated");
      }

      const { data: wishlistItem, error: checkError } = await supabase
        .from("wishlist")
        .select("id")
        .eq("student_id", user.id)
        .eq("course_id", courseId)
        .maybeSingle();

      if (checkError) {
        return rejectWithValue(checkError.message);
      }


      if (wishlistItem) {
        const { error: deleteError } = await supabase
          .from("wishlist")
          .delete()
          .eq("id", wishlistItem.id);

        if (deleteError) {
          return rejectWithValue(deleteError.message);
        }

        return {
          action: "removed" as const,
          courseId,
        };
      }


      const { error: insertError } = await supabase.from("wishlist").insert({
        student_id: user.id,
        course_id: courseId,
      });

      if (insertError) {
        return rejectWithValue(insertError.message);
      }

      return {
        action: "added" as const,
        courseId,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  },
);

export default actLikeToggle;
