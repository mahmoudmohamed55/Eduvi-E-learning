import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import categories from "./categories/categoriesSlice";
import courses from "./courses/coursesSlice";
import courseDetails from "./courseDetails/courseDetailsSlice";

export const store = configureStore({
  reducer: {
    auth,
    categories,
    courses,
    courseDetails,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
