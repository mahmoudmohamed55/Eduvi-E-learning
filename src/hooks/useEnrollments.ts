import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import useAuth from "@hooks/useAuth";

import actGetEnrollments from "@store/enrollments/act/actGetenrollments";

const useEnrollments = () => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();

  const { records, loading, error } = useAppSelector(
    (state) => state.enrollments,
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(actGetEnrollments());
    }
  }, [user?.id, dispatch]);

  return {
    records,
    loading,
    error,
  };
};

export default useEnrollments;
