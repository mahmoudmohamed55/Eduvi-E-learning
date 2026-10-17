import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";


export type TDashboardUser = {
  id: string;
  created_at: string;
  full_name: string;
  avatar: string | null;
  phone: string | null;
  role: "student" | "instructor" | "admin";
};

export const actGetUsers = createAsyncThunk<
  TDashboardUser[],
  void,
  { rejectValue: string }
>("dashboard/users/actGetUsers", async (_, thunkAPI) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, created_at, full_name, avatar, phone, role")
    .order("created_at", { ascending: false });

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data as TDashboardUser[];
});