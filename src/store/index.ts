import { configureStore } from "@reduxjs/toolkit";

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


import authReducer from "./auth/authSlice";
import categories from "./categories/categoriesSlice";
import courses from "./courses/coursesSlice";
import courseDetails from "./courseDetails/courseDetailsSlice";
import Profile from "./profile/profileSlice";
import wishlist from "./wishList/wishlistSlice";
import enrollments from "./enrollments/enrollmentSlice";
import storage from "./storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "profile"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

/* =====================================================
   CART
===================================================== */

const enrollmentsPersistConfig = {
  key: "enrollments",
  storage,
  whitelist: ["items"],
};

const persistedCartReducer = persistReducer(
  enrollmentsPersistConfig,
  enrollments,
);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,

    categories,
    courses,
    courseDetails,
    Profile,
    wishlist,
    enrollments: persistedCartReducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* =====================================================
   TYPES
===================================================== */

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/* =====================================================
   PERSISTOR
===================================================== */

export const persistor = persistStore(store);
