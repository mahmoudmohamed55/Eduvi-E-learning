import { createSlice } from "@reduxjs/toolkit";

import type { TLoading, TProfile } from "@types";

import actUpdateProfile from "./act/actUpdateProfile";
import actGetProfile from "./act/actGetProfile";

interface ProfileState {
  record: TProfile | null;
  loading: TLoading;
  error: string | null;
}

const initialState: ProfileState = {
  record: null,
  loading: "pending",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // =========================
      // Get Profile
      // =========================
      .addCase(actGetProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actGetProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.record = action.payload;
      })

      .addCase(actGetProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })

      .addCase(actUpdateProfile.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })

      .addCase(actUpdateProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";

        if (state.record) {
          state.record = {
            ...state.record,
            ...action.payload,
          };
        }
      })

      .addCase(actUpdateProfile.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
