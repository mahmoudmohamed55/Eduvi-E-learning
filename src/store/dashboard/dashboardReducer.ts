import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import categoriesReducer from "./categories/categoriesSlice";
const dashboardReducer = combineReducers({
  users: usersReducer,
  categories: categoriesReducer,
});

export default dashboardReducer;