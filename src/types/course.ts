export type TCourseLevel = "beginner" | "intermediate" | "advanced";

type TCourse = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  rate: number;
  price: number;
  category_id?: string;
  instructor_id?: string;
  level: TCourseLevel;
  instructor: {
    full_name: string;
    avatar: string;
  };
  isLiked?: boolean;
  isEnrolled?: boolean;
};

export type { TCourse };
