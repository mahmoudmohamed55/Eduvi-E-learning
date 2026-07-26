import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCourseDetails from "@store/courseDetails/act/actGetCourseDetails";

const useCourseDetails = () => {
  const dispatch = useAppDispatch();

  const { slug } = useParams();

  const { record, loading, error } = useAppSelector(
    (state) => state.courseDetails,
  );

  useEffect(() => {
    if (slug) {
      dispatch(actGetCourseDetails(slug));
    }
  }, [dispatch, slug]);

  return {
    record,
    loading,
    error,
  };
};

export default useCourseDetails;