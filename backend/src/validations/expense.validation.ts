import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  amount: z.coerce
    .number()
    .positive()
    .positive("Amount must be greater than 0"),

  category: z.enum([
    "FOOD",
    "TRAVEL",
    "BILLS",
    "SHOPPING",
    "HEALTH",
    "ENTERTAINMENT",
    "OTHER",
  ]),

  description: z.string().optional(),

  date: z.string(),
});

export const updateExpenseSchema = createExpenseSchema.partial();
