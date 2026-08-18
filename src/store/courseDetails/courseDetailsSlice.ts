import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TCourseDetailsInfo } from "@types";

import actGetCourseDetails from "./act/actGetCourseDetails";

interface ICourseDetailsState {
  record: TCourseDetailsInfo | null;
  loading: TLoading;
  error: string | null;
}

const initialState: ICourseDetailsState = {
  record: null,
  loading: "idle",
  error: null,
};

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState,
  reducers: {
    cleanCourseDetails: (state) => {
      state.record = null;
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCourseDetails.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCourseDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.record = action.payload;
        
      })
      .addCase(actGetCourseDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error =
          action.payload ?? "Something went wrong";
      });
  },
});

export const { cleanCourseDetails } = courseDetailsSlice.actions;

export default courseDetailsSlice.reducer;