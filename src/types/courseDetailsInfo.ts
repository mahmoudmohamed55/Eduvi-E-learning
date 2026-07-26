export type TCourseDetailsInfo = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  level: string;
  rate: number;

  instructor: {
    id: string;
    full_name: string;
    avatar: string;
  };

  sections: {
    id: string;
    title: string;
    order_number: number;

    lessons: {
      id: string;
      title: string;
      order_number: number;
      video_url: string;
    }[];
  }[];

  reviews: {
    id: string;
    rating: number;
    comment: string;
    created_at: string;

    student: {
      id: string;
      full_name: string;
      avatar: string;
    };
  }[];
};