import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

const actGetWishList = createAsyncThunk(
  "wishlist/getWishList",
  async (_, { rejectWithValue }) => {
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

      const { data, error } = await supabase
        .from("wishlist")
        .select("course_id")
        .eq("student_id", user.id);

      if (error) {
        return rejectWithValue(error.message);
      }

      return data.map((item) => item.course_id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  },
);

export default actGetWishList;
