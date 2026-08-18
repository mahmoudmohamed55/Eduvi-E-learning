import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetEnrollments from "@store/enrollments/act/actGetenrollments";
import { clearEnrollments } from "@store/enrollments/enrollmentSlice";

const useEnrollments = () => {
  const dispatch = useAppDispatch();

  const { records, loading, error } = useAppSelector(
    (state) => state.enrollments,
  );

  useEffect(() => {
    dispatch(actGetEnrollments());

    return () => {
      dispatch(clearEnrollments());
    };
  }, [dispatch]);

  return {
    records,
    loading,
    error,
  };
};

export default useEnrollments;
