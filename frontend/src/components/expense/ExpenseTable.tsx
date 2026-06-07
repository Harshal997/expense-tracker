import { type Expense } from "../../types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseTable = ({ expenses, onEdit, onDelete }: ExpenseTableProps) => {
  return (
    <div
      className="overflow-x-auto rounded-lg border bg-white

  dark:bg-gray-800
  dark:border-gray-700"
    >
      <table className="min-w-[700px] w-full">
        <thead>
          <tr className="border-b bg-gray-50 dark:bg-gray-900
  dark:border-gray-700">
            <th className="text-left p-4">Title</th>

            <th className="text-left p-4">Category</th>

            <th className="text-left p-4">Amount</th>

            <th className="text-left p-4">Date</th>

            <th className="text-center p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b last:border-b-0">
              <td className="p-4">
                <div>
                  <p className="font-medium">{expense.title}</p>

                  {expense.description && (
                    <p className="text-sm text-gray-500">
                      {expense.description}
                    </p>
                  )}
                </div>
              </td>

              <td className="p-4">
                <span className="rounded-full border px-3 py-1 text-sm">
                  {expense.category}
                </span>
              </td>

              <td className="p-4 font-semibold">
                ₹{Number(expense.amount).toLocaleString()}
              </td>

              <td className="p-4">
                {new Date(expense.date).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="border rounded px-3 py-1 hover:opacity-80 hover:cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(expense.id)}
                    className="border rounded px-3 py-1 hover:opacity-80 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
