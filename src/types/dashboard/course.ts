export type TCourseLevel = "beginner" | "intermediate" | "advanced";

export interface TCourseDashboard {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  price: number;
  category_id: string;
  instructor_id: string;
  level: TCourseLevel;
  rate: number;
  created_at: string;
  category?: {
    id: string;
    name: string;
  } | null;
  instructor?: {
    id: string;
    full_name: string;
    avatar: string | null;
  } | null;
}

export interface TCourseFormValues {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  category_id: string;
  instructor_id: string;
  level: TCourseLevel;
  rate: number;
}

export interface TCourseFormOptions {
  categories: { id: string; name: string }[];
  instructors: { id: string; full_name: string }[];
}