import actGetCategories from "@store/categories/act/actGetCategories";
import { clearCategories } from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.categories,
  );
  console.log("records", records);
  useEffect(() => {
    const promise = dispatch(actGetCategories());
    return () => {
      dispatch(clearCategories());
      promise.abort();
    };
  }, []);
  return { records, loading, error };
};
