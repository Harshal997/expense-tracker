export interface DashboardSummary {
  totalExpenses: number;
  monthlyExpenses: number;
  transactionCount: number;

  recentTransactions: Expense[];
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}