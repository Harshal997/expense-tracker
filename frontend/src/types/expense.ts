export type ExpenseCategory =
  | "FOOD"
  | "TRAVEL"
  | "BILLS"
  | "SHOPPING"
  | "HEALTH"
  | "ENTERTAINMENT"
  | "OTHER";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  description?: string;
  date: string;
}

export interface ExpenseResponse {
  data: Expense[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}