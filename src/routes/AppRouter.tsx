import { MainLayout } from "@layout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import PageSuspenseFallback from "@components/feedback/suspense/PageSuspenseFallback";

import ProtectedRoute from "@routes/ProtectedRoute";
const Home = lazy(() => import("@pages/Home"));
const Register = lazy(() => import("@pages/Sign-up"));
const Login = lazy(() => import("@pages/Login"));
const Categories = lazy(() => import("@pages/Categories"));
const CategoryDetails = lazy(() => import("@pages/CategoryDetails"));
const Courses = lazy(() => import("@pages/Courses"));
const CourseDetails = lazy(() => import("@pages/CourseDetails"));
const Profile = lazy(() => import("@pages/Profile"));
const Favorites = lazy(() => import("@pages/Favorites"));
const Enrollments = lazy(() => import("@pages/Enrollments"));
const Error404 = lazy(() => import("@pages/Error404"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "courses",
        element: (
          <PageSuspenseFallback>
            <Courses />
          </PageSuspenseFallback>
        ),
      },

      {
        path: "categories",
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "categories/:slug",
        element: (
          <PageSuspenseFallback>
            <CategoryDetails />
          </PageSuspenseFallback>
        ),
        loader: async ({ params }) => {
          if (typeof params.slug !== "string" || !params.slug.trim()) {
            throw new Error("Invalid category slug");
          }
        },
      },
      {
        path: "courses/:slug",
        element: (
          <PageSuspenseFallback>
            <CourseDetails />
          </PageSuspenseFallback>
        ),
        loader: async ({ params }) => {
          if (
            typeof params.slug !== "string" ||
            !/^[a-zA-Z0-9_-]+$/.test(params.slug)
          ) {
            throw new Error("Invalid course slug");
          }
        },
      },
      {
        path: "categories/:slug",
        element: (
          <PageSuspenseFallback>
            <CategoryDetails />
          </PageSuspenseFallback>
        ),
      },

      {
        path: "profile",
        element: (
          <PageSuspenseFallback>
            <Profile />
          </PageSuspenseFallback>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "enrollments",
            element: (
              <PageSuspenseFallback>
                <Enrollments />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "favorites",
            element: (
              <PageSuspenseFallback>
                <Favorites />
              </PageSuspenseFallback>
            ),
          },
        ],
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
