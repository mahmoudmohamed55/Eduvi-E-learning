import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  actGetWishList,
  actGetWishListCourses,
} from "@store/wishList/wishlistSlice";

const useWishList = () => {
  const dispatch = useAppDispatch();

  const { loading, toggleLoading, error, items, courseFullInfo } =
    useAppSelector((state) => state.wishlist);

  useEffect(() => {
    const loadWishlist = async () => {
      const result = await dispatch(actGetWishList());

      if (actGetWishList.fulfilled.match(result)) {
        const courseIds = result.payload;

        if (courseIds.length > 0) {
          dispatch(actGetWishListCourses(courseIds));
        }
      }
    };

    loadWishlist();
  }, [dispatch]);
  const fullData = courseFullInfo.map((course) => ({
    ...course,
    isLiked: items.includes(course.id),
  }));
  return {
    loading,
    toggleLoading,
    error,
    items,
    courseFullInfo: fullData,
  };
};

export default useWishList;
