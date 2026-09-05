import { LottieHandler } from "@components/feedback/lottie/LottieHandler";
import useAuth from "@hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DashboardProtectedRoute = () => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!profile && loading === "pending") {
    return <LottieHandler type="loading" />;
  }


  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default DashboardProtectedRoute;
