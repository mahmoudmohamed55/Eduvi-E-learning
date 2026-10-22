import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import categoriesReducer from "./categories/categoriesSlice";
import coursesReducer from "./courses/courseSlice";
const dashboardReducer = combineReducers({
  users: usersReducer,
  categories: categoriesReducer,
  courses: coursesReducer,
});

export default dashboardReducer;