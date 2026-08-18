import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetCourseDetails from "@store/courseDetails/act/actGetCourseDetails";

import type { TCourseDetailsInfo } from "@types";

const useCourseDetails = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  const { record, loading, error } = useAppSelector(
    (state) => state.courseDetails,
  );

  const { items: enrollments } = useAppSelector((state) => state.enrollments);

  const fullRecord: TCourseDetailsInfo | null = record
    ? {
        ...record,
        isEnrolled: enrollments.includes(record.id),
      }
    : null;

  useEffect(() => {
    if (slug) {
      dispatch(actGetCourseDetails(slug));
    }
  }, [dispatch, slug]);

  return {
    record: fullRecord,
    loading,
    error,
  };
};

export default useCourseDetails;
