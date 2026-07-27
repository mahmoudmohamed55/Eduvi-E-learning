import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import actGetProfile from "@store/profile/act/actGetProfile";
import actUpdateProfile from "@store/profile/act/actUpdateProfile";

import type { TUpdateProfile } from "@types";
import ProfileEdit from "@components/profile/ProfileEdit";
import ProfileView from "@components/profile/ProfileView";
import StatsGrid from "@components/profile/StatsGrid";
import LearningProgress from "@components/profile/LearningProgress";
import Achievements from "@components/profile/Achievements";
import { Heading } from "@components/common/heading/Heading";

const Profile = () => {
  const dispatch = useAppDispatch();

  const { record, loading } = useAppSelector(
    (state) => state.Profile
  );

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

  if (!record) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
    <Heading title="Profile" description="Manage your profile and account settings." image={""} />
    <section className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <div>
          {isEditing ? (
            <ProfileEdit
              profile={record}
              loading={loading === "pending"}
              onCancel={handleCancel}
              onSubmit={handleSave}
            />
          ) : (
            <ProfileView
              profile={record}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>

        {/* Right */}
        <div className="space-y-8">
          <StatsGrid
            enrolledCourses={record.enrolledCourses}
            completedLessons={record.completedLessons}
            pendingLessons={record.pendingLessons}
            progress={record.progress}
          />

          <LearningProgress progress={record.progress} />

          <Achievements />
        </div>
      </div>
    </section>
    </>
  );
};

export default Profile;