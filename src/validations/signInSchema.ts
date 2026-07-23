import { z } from "zod";
const signInSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email address",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/, {
        message:
          "Confirm Password must contain at least one uppercase letter and one special character",
      }),
    })
type LoginFormValues = z.infer<typeof signInSchema>;
export { type LoginFormValues, signInSchema };
