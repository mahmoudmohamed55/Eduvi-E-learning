import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@utils/supabase";

import type { TDashboardUser } from "./actGetUsers";

export type TUpdateUserPayload = {
  id: string;
  full_name: string;
  phone?: string | null;
  avatar?: string | null;
  role: "student" | "instructor" | "admin";
};

export const actUpdateUser = createAsyncThunk<
  TDashboardUser,
  TUpdateUserPayload,
  { rejectValue: string }
>("dashboard/users/actUpdateUser", async (userData, thunkAPI) => {
  const { id, ...updatedData } = userData;

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: updatedData.full_name,
      phone: updatedData.phone ?? null,
      avatar: updatedData.avatar ?? null,
      role: updatedData.role,
    })
    .eq("id", id)
    .select("id, created_at, full_name, avatar, phone, role")
    .single();

  if (error) {
    return thunkAPI.rejectWithValue(error.message);
  }

  return data as TDashboardUser;
});