import { MainLayout } from "@layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Courses } from "@pages/Courses";
import { Home } from "@pages/Home";
import { Register } from "@pages/Sign-up";
import { Login } from "@pages/Login";

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
