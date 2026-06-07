import { type Expense } from "../../types/dashboard";

interface Props {
  expenses: Expense[];
}

const RecentTransactions = ({ expenses }: Props) => {
    console.log('RecentTransactions rendered', expenses);
  return (
    <div className="border rounded-lg p-4 bg-white

  dark:bg-gray-800
  dark:border-gray-700">
      <h2 className="font-semibold mb-4 text-black dark:text-white">
        Recent Transactions
      </h2>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex justify-between">
            <span>{expense.title}</span>

            <span>₹{expense.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
