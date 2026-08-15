
import ProfileEdit from "@components/profile/ProfileEdit";
import ProfileView from "@components/profile/ProfileView";
import StatsGrid from "@components/profile/StatsGrid";
import LearningProgress from "@components/profile/LearningProgress";
import Achievements from "@components/profile/Achievements";
import { Heading } from "@components/common/heading/Heading";
import useProfile from "@hooks/useProfile";
import profileImage from "@assets/profile.png";
import { LottieHandler } from "@components/feedback/lottie/LottieHandler";
const Profile = () => {

const { isEditing, setIsEditing, record, loading, handleSave, handleCancel } = useProfile();
  if (!record) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
      <LottieHandler type="loading" />
      </div>
    );
  }

  return (
    <>
    <Heading title="Profile" description="Manage your profile and account settings." image={profileImage} />
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