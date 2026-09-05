export type TRole = "student" | "instructor" | "admin";

export type TProfile = {
  id: string;
  full_name: string;
  avatar: string;
  phone: string;
  role: TRole;
  created_at: string;
  enrolledCourses: number;
  completedLessons: number;
  pendingLessons: number;
  progress: number;
};

export type ProfileAvatarProps = {
  avatar: string;
  fullName: string;
  isEditing?: boolean;
  preview?: string;
  onSelectImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TUpdateProfile = {
  full_name: string;
  phone: string;
  avatar: File | null;
};