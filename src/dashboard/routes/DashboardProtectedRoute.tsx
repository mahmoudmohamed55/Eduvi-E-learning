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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <LottieHandler
          type="error"
          message="You do not have access to this page."
          BackToHomeButton={true}
        />
      </div>
    );
  }

  return <Outlet />;
};

export default DashboardProtectedRoute;
