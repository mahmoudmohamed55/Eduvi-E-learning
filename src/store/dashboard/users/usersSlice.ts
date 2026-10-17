import { createSlice } from "@reduxjs/toolkit";

import { actGetUsers, type TDashboardUser } from "./act/actGetUsers";
import { actAddUser } from "./act/actAddUser";
import { actUpdateUser } from "./act/actUpdateUser";
import { actDeleteUser } from "./act/actDeleteUser";

type TUsersState = {
  users: TDashboardUser[];
  loading: boolean;
  error: string | null;
};

const initialState: TUsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "dashboardUsers",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =========================
      // GET USERS
      // =========================

      .addCase(actGetUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(actGetUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(actGetUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // =========================
      // ADD USER
      // =========================

      .addCase(actAddUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(actAddUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users.unshift(action.payload);
      })

      .addCase(actAddUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // =========================
      // UPDATE USER
      // =========================

      .addCase(actUpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(actUpdateUser.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(actUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // =========================
      // DELETE USER
      // =========================

      .addCase(actDeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(actDeleteUser.fulfilled, (state, action) => {
        state.loading = false;

        state.users = state.users.filter(
          (user) => user.id !== action.payload
        );
      })

      .addCase(actDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default usersSlice.reducer;