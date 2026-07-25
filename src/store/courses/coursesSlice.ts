import { createSlice } from "@reduxjs/toolkit";
import type { TCourse, TLoading } from "@types";
import actGetCoursesByCategory from "./act/actGetCoursesByCategory";
import actGetCourses from "./act/actGetCourses";
interface ICourses {
  record: TCourse[];
  total: number;
  loading: TLoading;
  error: string | null;
}
const initialState : ICourses = {
  record: [],
  total: 0,
  loading: "idle",
  error: null,
};


const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourses: (state) => {
      state.record = [];
      state.loading = "idle";
      state.error = null;
    }
  },
extraReducers: (builder) => {
    builder.addCase(actGetCoursesByCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCoursesByCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.record = action.payload || [];
    });
    builder.addCase(actGetCoursesByCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(actGetCourses.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
builder.addCase(actGetCourses.fulfilled, (state, action) => {
    state.loading = "succeeded";
    state.record = action.payload.courses;
    state.total = action.payload.total;
});
    builder.addCase(actGetCourses.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export const {clearCourses} = coursesSlice.actions;

export default coursesSlice.reducer;