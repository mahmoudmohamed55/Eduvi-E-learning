import { z } from "zod";

const courseSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z.string().trim().min(3, "Slug is required"),
  description: z.string().trim().min(10, "Description is too short"),
  thumbnail: z
    .string()
    .trim()
    .refine(
      (value) => !value || z.string().url().safeParse(value).success,
      "Enter a valid image URL",
    ),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  category_id: z.string().min(1, "Choose a category"),
  instructor_id: z.string().min(1, "Choose an instructor"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  rate: z.coerce.number().min(0).max(5),
});

export default courseSchema;