import actGetCoursesByCategory from "@store/courses/act/actGetCoursesByCategory";
import { clearCourses } from "@store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const useCategoryDetails = () => {
  const dispatch = useAppDispatch();
  const { record, loading, error } = useAppSelector(
    (state) => state.courses,
  );
    const { slug } = useParams<{ slug: string }>();
    useEffect(() => {
    const promise =     dispatch(actGetCoursesByCategory(slug || ""));
      return () => {
        dispatch(clearCourses());
        promise.abort();
      }
    }, [slug]);
  return { records: record, loading, error };
};
