import { MainLayout } from "@layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@pages/Home";
import { Register } from "@pages/Sign-up";
import { Login } from "@pages/Login";
import { Categories } from "@pages/Categories";
import { CategoryDetails } from "@pages/CategoryDetails";
import Courses from "@pages/Courses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:slug",
        element: <CategoryDetails />,
      },
      {
        path: "profile",
        element: <h1>Profile</h1>,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
