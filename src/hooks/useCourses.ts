import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import actGetCourses from "@store/courses/act/actGetCourses";
import { useAppDispatch, useAppSelector } from "@store/hooks";

export const useCourses = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();


  const page = Number(searchParams.get("page") || 1);

  const { record, total, loading, error } = useAppSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(actGetCourses(page));
  }, [page]);

  return {
    page,
    total,
    record,
    loading,
    error,
  };
};