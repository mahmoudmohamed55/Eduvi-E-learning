import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import type { User } from "@supabase/supabase-js";
import actGetProfile from "./act/actGetProfile";
export type TUserRole = "student" | "instructor" | "admin";

export interface TProfile {
  id: string;
  full_name: string;
  avatar: string | null;
  phone: string | null;
  role: TUserRole;
}
interface AuthState {
  user: User | null;
  accessToken: string | null;
  profile: TProfile | null;
  loading: TLoading;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
  profile: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI(state) {
      state.loading = "idle";
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.profile = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.session?.access_token || null;
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload?.user || null;
      state.accessToken = action.payload?.session?.access_token || null;
      
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(actGetProfile.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetProfile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.profile = action.payload;
    });

    builder.addCase(actGetProfile.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;

export const { resetUI, logout } = authSlice.actions;
