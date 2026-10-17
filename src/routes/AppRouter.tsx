import { MainLayout } from "@layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

import PageSuspenseFallback from "@components/feedback/suspense/PageSuspenseFallback";

import ProtectedRoute from "@routes/ProtectedRoute";

import Layout from "@dashboard/layout/Layout";
import DashboardProtectedRoute from "@dashboard/routes/DashboardProtectedRoute";
import GuestRoute from "./GuestRoute";

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



const DashboardUsers = lazy(() => import("@dashboard/pages/DashboardUsers"));

const AddUser = lazy(() => import("@dashboard/pages/AddUser"));

const UserDetails = lazy(() => import("@dashboard/pages/UserDetails"));

const UpdateUser = lazy(() => import("@dashboard/pages/UpdateUser"));

const DashboardCategories = lazy(
  () => import("@dashboard/pages/DashboardCategories"),
);

const DashboardCourses = lazy(
  () => import("@dashboard/pages/DashboardCourses"),
);
const DashboardAddCategory = lazy(() => import("@dashboard/pages/AddCategory"));
const DashboardEditCategory = lazy(
  () => import("@dashboard/pages/UpdateCategory"),
);

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

          // Favorites
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
        element: <GuestRoute />,
        children: [
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
    ],
  },

  {
    path: "dashboard",
    element: <DashboardProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <DashboardUsers />
              </PageSuspenseFallback>
            ),
          },

          {
            path: "users/add",
            element: (
              <PageSuspenseFallback>
                <AddUser />
              </PageSuspenseFallback>
            ),
          },

          // User Details
          {
            path: "users/:id",
            element: (
              <PageSuspenseFallback>
                <UserDetails />
              </PageSuspenseFallback>
            ),
          },

          {
            path: "users/:id/edit",
            element: (
              <PageSuspenseFallback>
                <UpdateUser />
              </PageSuspenseFallback>
            ),
          },

          {
            path: "categories",
            element: (
              <PageSuspenseFallback>
                <DashboardCategories />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "categories/add",
            element: (
              <PageSuspenseFallback>
                <DashboardAddCategory />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "categories/:id/edit",
            element: (
              <PageSuspenseFallback>
                <DashboardEditCategory />
              </PageSuspenseFallback>
            ),
          },

          {
            path: "courses",
            element: (
              <PageSuspenseFallback>
                <DashboardCourses />
              </PageSuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
