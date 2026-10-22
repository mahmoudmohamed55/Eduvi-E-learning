import { createSlice } from "@reduxjs/toolkit";



import actGetCourses from "./act/actGetCourses";
import actGetCourseById from "./act/actGetCourseById";
import actGetCourseFormOptions from "./act/actGetCourseFormOptions";
import actAddCourse from "./act/actAddCourse";
import actUpdateCourse from "./act/actUpdateCourse";
import actDeleteCourse from "./act/actDeleteCourse";
import type { TCourseDashboard, TCourseFormOptions } from "@types";

interface TCourseState {
  record: TCourseDashboard[];
  total: number;
  loading: boolean;
  saving: boolean;
  error: string | null;
  selectedCourse: TCourseDashboard | null;
  selectedLoading: boolean;
  selectedError: string | null;
  options: TCourseFormOptions;
  optionsLoading: boolean;
}

const initialState: TCourseState = {
  record: [],
  total: 0,
  loading: false,
  saving: false,
  error: null,
  selectedCourse: null,
  selectedLoading: false,
  selectedError: null,
  options: {
    categories: [],
    instructors: [],
  },
  optionsLoading: false,
};

const courseSlice = createSlice({
  name: "dashboardCourses",
  initialState,
  reducers: {
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
      state.selectedError = null;
    },
    clearCoursesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all courses
      .addCase(actGetCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.record = action.payload.courses;
        state.total = action.payload.total;
      })
      .addCase(actGetCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch courses";
      })

      // Get course by ID
      .addCase(actGetCourseById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedCourse = null;
      })
      .addCase(actGetCourseById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(actGetCourseById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError =
          action.payload ?? "Failed to fetch course";
      })

      // Get form options
      .addCase(actGetCourseFormOptions.pending, (state) => {
        state.optionsLoading = true;
      })
      .addCase(actGetCourseFormOptions.fulfilled, (state, action) => {
        state.optionsLoading = false;
        state.options = action.payload;
      })
      .addCase(actGetCourseFormOptions.rejected, (state) => {
        state.optionsLoading = false;
      })

      // Add course
      .addCase(actAddCourse.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(actAddCourse.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(actAddCourse.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? "Failed to add course";
      })

      // Update course
      .addCase(actUpdateCourse.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(actUpdateCourse.fulfilled, (state, action) => {
        state.saving = false;
        state.selectedCourse = action.payload;

        state.record = state.record.map((course) =>
          course.id === action.payload.id
            ? { ...course, ...action.payload }
            : course,
        );
      })
      .addCase(actUpdateCourse.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload ?? "Failed to update course";
      })

      // Delete course
      .addCase(actDeleteCourse.fulfilled, (state, action) => {
        state.record = state.record.filter(
          (course) => course.id !== action.payload,
        );
        state.total = Math.max(0, state.total - 1);
      });
  },
});

export const { clearSelectedCourse, clearCoursesError } =
  courseSlice.actions;

export {
  actGetCourses,
  actGetCourseById,
  actGetCourseFormOptions,
  actAddCourse,
  actUpdateCourse,
  actDeleteCourse,
};

export default courseSlice.reducer;