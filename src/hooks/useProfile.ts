import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetProfile from "@store/profile/act/actGetProfile";
import actUpdateProfile from "@store/profile/act/actUpdateProfile";

import type { TUpdateProfile } from "@types";

const useProfile = () => {
  const dispatch = useAppDispatch();

  const { record, loading , error } = useAppSelector((state) => state.Profile);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(actGetProfile());
  }, [dispatch]);

  const handleSave = async (data: TUpdateProfile) => {
    const result = await dispatch(actUpdateProfile(data));

    if (actUpdateProfile.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return { isEditing, setIsEditing, record, loading, handleSave, handleCancel , error };
};

export default useProfile;