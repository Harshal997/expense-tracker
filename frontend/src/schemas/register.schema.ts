import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
