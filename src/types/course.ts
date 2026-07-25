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
  level: "beginner" | "intermediate" | "advanced";
  instructor: {
    full_name: string;
    avatar: string;
  };
};

export type { TCourse };