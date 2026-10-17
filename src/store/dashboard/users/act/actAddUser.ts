import { createAsyncThunk } from "@reduxjs/toolkit";

import { supabase } from "@utils/supabase";

import type { TDashboardUser } from "./actGetUsers";

export type TAddUserPayload = {
  email: string;
  password: string;
  full_name: string;
  phone?: string | null;
  role: "student" | "instructor" | "admin";
};

export const actAddUser = createAsyncThunk<
  TDashboardUser,
  TAddUserPayload,
  { rejectValue: string }
>(
  "dashboard/users/actAddUser",
  async (userData, thunkAPI) => {
    // 1. Create Auth User
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.full_name,
        },
      },
    });

    if (authError) {
      return thunkAPI.rejectWithValue(authError.message);
    }

    if (!authData.user) {
      return thunkAPI.rejectWithValue(
        "User was not created."
      );
    }

    // Supabase generates this ID automatically
    const userId = authData.user.id;

    // 2. Create Profile using generated ID
    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name: userData.full_name,
        phone: userData.phone ?? null,
        avatar: null,
        role: userData.role,
      })
      .select(
        "id, created_at, full_name, avatar, phone, role"
      )
      .single();

    if (profileError) {
      return thunkAPI.rejectWithValue(
        profileError.message
      );
    }

    return profile as TDashboardUser;
  }
);