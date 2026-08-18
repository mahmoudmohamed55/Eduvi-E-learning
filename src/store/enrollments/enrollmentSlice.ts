import { createSlice } from "@reduxjs/toolkit";

import type { TEnrollmentCourse, TLoading } from "@types";

import actGetEnrollments from "./act/actGetenrollments";
import actAddEnrollments from "./act/actAddenrollments";

interface EnrollmentsState {
  items: string[];
  records: TEnrollmentCourse[];
  loading: TLoading;
  error: string | null;
  addLoading: TLoading;
}

const initialState: EnrollmentsState = {
  items: [],
  records: [],
  loading: "idle",
  error: null,
  addLoading: "idle",
};

const enrollmentsSlice = createSlice({
  name: "enrollments",

  initialState,

  reducers: {
    clearEnrollments: (state) => {
      state.items = [];
      state.records = [];
      state.loading = "idle";
      state.addLoading = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {


    builder.addCase(actGetEnrollments.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetEnrollments.fulfilled, (state, action) => {
      state.loading = "succeeded";

      state.records = action.payload;

      state.items = action.payload.map((course) => course.id);
    });

    builder.addCase(actGetEnrollments.rejected, (state, action) => {
      state.loading = "failed";

      state.error =
        (action.payload as string) ||
        action.error.message ||
        "Failed to fetch enrollments";
    });



    builder.addCase(actAddEnrollments.pending, (state) => {
      state.addLoading = "pending";
      state.error = null;
    });

    builder.addCase(actAddEnrollments.fulfilled, (state, action) => {
      state.addLoading = "succeeded";

      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    });

    builder.addCase(actAddEnrollments.rejected, (state, action) => {
      state.addLoading = "failed";

      state.error =
        (action.payload as string) ||
        action.error.message ||
        "Failed to add enrollment";
    });
  },
});

export default enrollmentsSlice.reducer;

export const { clearEnrollments } = enrollmentsSlice.actions;
