import { createSlice } from "@reduxjs/toolkit";

import type { TCourse, TLoading } from "@types";

import actLikeToggle from "./act/actLikeToggle";
import actGetWishList from "./act/actGetWishList";
import actGetWishListCourses from "../../../actGetWishListCourses";

interface WishlistState {
  items: string[];
  courseFullInfo: TCourse[];
  error: string | null;
  loading: TLoading;
  toggleLoading: TLoading;
  toggleCourseId: string | null;
}

const initialState: WishlistState = {
  items: [],
  courseFullInfo: [],
  error: null,
  loading: "idle",
  toggleLoading: "idle",
  toggleCourseId: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.courseFullInfo = [];
      state.loading = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actGetWishList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetWishList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.items = action.payload;
    });

    builder.addCase(actGetWishList.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(actLikeToggle.pending, (state, action) => {
      state.toggleLoading = "pending";
      state.error = null;
      state.toggleCourseId = action.meta.arg;
    });

    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      state.toggleLoading = "succeeded";

      const { action: toggleAction, courseId } = action.payload;

      if (toggleAction === "added") {
        state.items.push(courseId);
      }

      if (toggleAction === "removed") {
        state.items = state.items.filter((id) => id !== courseId);

        state.courseFullInfo = state.courseFullInfo.filter(
          (course) => course.id !== courseId,
        );
      }
    });

    builder.addCase(actLikeToggle.rejected, (state, action) => {
      state.toggleLoading = "failed";
      state.error = action.payload as string;
    });

    builder.addCase(actGetWishListCourses.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(actGetWishListCourses.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.courseFullInfo = action.payload;
    });

    builder.addCase(actGetWishListCourses.rejected, (state, action) => {
      console.error("❌ WISHLIST COURSES REJECTED:", action.payload);

      state.loading = "failed";
      state.error =
        (action.payload as string) ||
        action.error.message ||
        "Something went wrong";
    });
  },
});

export { actLikeToggle, actGetWishList, actGetWishListCourses };

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
