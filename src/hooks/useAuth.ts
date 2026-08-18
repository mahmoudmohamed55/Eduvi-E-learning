import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetProfile from "@store/auth/act/actGetProfile";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const { user, profile, accessToken, loading, error } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(actGetProfile(user.id));
    }
  }, [user?.id, dispatch]);

  return {
    user,
    profile,
    accessToken,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: profile?.role === "admin",
  };
};

export default useAuth;