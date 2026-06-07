import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
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
  date: z.string().min(1, "Date required"),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
