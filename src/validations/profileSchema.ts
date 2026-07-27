import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),

  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long"),
});

export type TProfileSchema = z.infer<typeof profileSchema>;