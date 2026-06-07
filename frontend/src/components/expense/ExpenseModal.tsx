import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../api/axios";
import { type Expense } from "../../types/expense";
import {
  expenseSchema,
  type ExpenseFormData,
} from "../../schemas/expense.schema";

interface ExpenseModalProps {
  open: boolean;

  expense: Expense | null;

  onClose: () => void;

  onSuccess: () => void;
}

const ExpenseModal = ({
  open,
  expense,
  onClose,
  onSuccess,
}: ExpenseModalProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),
  });

  useEffect(() => {
    if (!open) return;

    if (expense) {
      reset({
        title: expense.title,
        amount: expense.amount,

        category: expense.category,

        description: expense.description ?? "",

        date: expense.date.split("T")[0],
      });
    } else {
      reset({
        title: "",
        amount: 0,
        category: "FOOD",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [expense, open, reset]);

  const onSubmit = async (values: ExpenseFormData) => {
    try {
      setLoading(true);

      if (expense) {
        await api.put(`/expenses/${expense.id}`, values);
      } else {
        await api.post("/expenses", values);
      }

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div
        className="
  bg-white

  dark:bg-gray-800

  rounded-xl
  w-full
  max-w-lg
  p-6
"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold bg-black text-white px-3 py-1 rounded">
            {expense ? "Edit Expense" : "Add Expense"}
          </h2>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>

            <input
              {...register("title")}
              className="border rounded-lg p-2 w-full"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Amount</label>

            <input
              type="number"
              step="0.01"
              {...register("amount")}
              className="border rounded-lg p-2 w-full"
            />

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Category</label>

            <select
              {...register("category")}
              className="w-full border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="FOOD">Food</option>
              <option value="TRAVEL">Travel</option>
              <option value="BILLS">Bills</option>
              <option value="SHOPPING">Shopping</option>
              <option value="HEALTH">Health</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="OTHER">Other</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1">Description</label>

            <textarea
              rows={3}
              {...register("description")}
              className="border rounded-lg p-2 w-full resize-none"
            />
          </div>
          <div>
            <label className="block mb-1">Date</label>

            <input
              type="date"
              {...register("date")}
              className="border rounded-lg p-2 w-full"
            />

            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="border px-4 py-2 rounded-lg"
            >
              {loading
                ? "Saving..."
                : expense
                  ? "Update Expense"
                  : "Create Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
