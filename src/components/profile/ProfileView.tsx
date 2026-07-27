import { Pencil } from "lucide-react";

import type { TProfile } from "@types";

import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";

type ProfileViewProps = {
  profile: TProfile;
  onEdit: () => void;
};

const ProfileView = ({
  profile,
  onEdit,
}: ProfileViewProps) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center">
        <ProfileAvatar
          avatar={profile.avatar}
          fullName={profile.full_name}
        />

        <div className="mt-8 w-full">
          <ProfileInfo
            fullName={profile.full_name}
            role={profile.role}
            phone={profile.phone}
            createdAt={profile.created_at}
          />
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <Pencil size={18} />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileView;