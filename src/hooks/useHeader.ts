import { logout } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@utils/supabase";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { clearProfile } from "@store/profile/profileSlice";
import { clearWishlist } from "@store/wishList/wishlistSlice";
import { clearEnrollments } from "@store/enrollments/enrollmentSlice";
import { useNavigate } from "react-router-dom";
import actGetEnrollments from "@store/enrollments/act/actGetenrollments";

const useHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useAppDispatch();
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setError(error);
        setLoading(false);
        return;
      }

      setData(data.session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setData(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(actGetEnrollments());
    }
  }, [user?.id, dispatch]);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
      setError(error);
      return;
    }
    dispatch(logout());
    dispatch(clearWishlist());
    dispatch(clearEnrollments());
    dispatch(clearProfile());
    setData(null);
    navigate("/");
  };

  return {
    isOpen,
    setIsOpen,
    handleLogout,
    data,
    loading,
    error,
    isAdmin,
  };
};

export default useHeader;
