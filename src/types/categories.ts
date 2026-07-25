import type { TCourse } from "./course";

type TCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  courses: TCourse[];
};
export type { TCategory };
