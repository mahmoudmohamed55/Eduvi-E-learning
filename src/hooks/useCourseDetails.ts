import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetCourseDetails from "@store/courseDetails/act/actGetCourseDetails";

import type { TCourseDetailsInfo } from "@types";
import actGetEnrollments from "@store/enrollments/act/actGetenrollments";
import useAuth from "./useAuth";

const useCourseDetails = () => {
  const { user } = useAuth();
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
  useEffect(() => {
    if (user?.id) {
      dispatch(actGetEnrollments());
    }
  }, [user?.id, dispatch]);
  return {
    record: fullRecord,
    loading,
    error,
  };
};

export default useCourseDetails;
