import { createAsyncThunk } from "@reduxjs/toolkit";



import type { TProfile } from "../authSlice";
import { supabase } from "@utils/supabase";

const actGetProfile = createAsyncThunk<
  TProfile,
  string,
  { rejectValue: string }
>(
  "auth/actGetProfile",

  async (userId, thunkAPI) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, avatar, phone, role")
      .eq("id", userId)
      .single();

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    return data;
  },
);

export default actGetProfile;
