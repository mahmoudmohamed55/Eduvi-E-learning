import { MainLayout } from "@layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Courses } from "@pages/Courses";
import { Home } from "@pages/Home";


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
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
