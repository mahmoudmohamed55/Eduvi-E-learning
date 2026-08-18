import { useState } from "react";
import { Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { TProfile, TUpdateProfile } from "@types";

import ProfileAvatar from "./ProfileAvatar";
import { profileSchema, type TProfileSchema } from "@validations/profileSchema";
import { Input } from "@components/form/Input";

type ProfileEditProps = {
  profile: TProfile;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: TUpdateProfile) => void;
};

const ProfileEdit = ({
  profile,
  loading,
  onCancel,
  onSubmit,
}: ProfileEditProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
 
  const [preview, setPreview] = useState<string>();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileSchema>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      phone: profile.phone,
    },
  });

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
  
    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = (data: TProfileSchema) => {
    onSubmit({
      ...data,
      avatar: selectedImage,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col items-center">
        <ProfileAvatar
          avatar={profile.avatar}
          fullName={profile.full_name}
          isEditing
          preview={preview}
          onSelectImage={handleSelectImage}
        />

        <div className="mt-8 w-full space-y-5">
          <Input<TProfileSchema>
            name="full_name"
            placeholder="Full Name"
            register={register}
            errors={errors.full_name?.message}
          />

          <Input<TProfileSchema>
            name="phone"
            placeholder="Phone Number"
            register={register}
            errors={errors.phone?.message}
          />
        </div>

        <div className="mt-8 flex w-full gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-primary-600 px-5 py-3 font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="flex items-center justify-center gap-2">
              <Save size={18} />
              Save Changes
            </span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-5 py-3 font-medium text-ink-700 transition hover:bg-neutral-50"
          >
            <span className="flex items-center justify-center gap-2">
              <X size={18} />
              Cancel
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;
