import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import actGetCourses from "@store/courses/act/actGetCourses";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishList } from "@store/wishList/wishlistSlice";

export const useCourses = () => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const { items } = useAppSelector((state) => state.wishlist);
  const page = Number(searchParams.get("page") || 1);

  const {
    record: data,
    total,
    loading,
    error,
  } = useAppSelector((state) => state.courses);
  const fullRecord = data.map((course) => ({
    ...course,
    isLiked: items.includes(course.id),
  }));
  useEffect(() => {
    dispatch(actGetCourses(page));
  }, [page]);
  useEffect(() => {
    dispatch(actGetWishList());
  }, [dispatch]);

  return {
    page,
    total,
    record: fullRecord,
    loading,
    error,
  };
};
