import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";
import categories from "./categories/categoriesSlice";
import courses from "./courses/coursesSlice";
import courseDetails from "./courseDetails/courseDetailsSlice";
import Profile from "./profile/profileSlice";
import wishlist from "./wishList/wishlistSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
export const store = configureStore({
  reducer: {
    auth,
    categories,
    courses,
    courseDetails,
    Profile,
    wishlist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
