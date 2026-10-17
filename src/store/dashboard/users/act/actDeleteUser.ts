import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@utils/supabase";

export const actDeleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("dashboard/users/actDeleteUser", async (userId, thunkAPI) => {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return userId;
});