import { Camera } from "lucide-react";

type ProfileAvatarProps = {
  avatar: string;
  fullName: string;
  isEditing?: boolean;
  preview?: string;
  onSelectImage?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const ProfileAvatar = ({
  avatar,
  fullName,
  isEditing = false,
  preview,
  onSelectImage,
}: ProfileAvatarProps) => {
  const imageSrc = preview || avatar;

  return (
    <div className="relative mx-auto h-40 w-40">
      <img
        src={imageSrc}
        alt={fullName}
        className="h-full w-full rounded-full border-4 border-white object-cover shadow-lg"
      />

      {isEditing && (
        <>
          <label
            htmlFor="avatar"
            className="absolute right-2 bottom-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
          >
            <Camera size={20} />
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onSelectImage}
          />
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;