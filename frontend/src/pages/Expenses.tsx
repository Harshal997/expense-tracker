import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import ExpenseTable from "../components/expense/ExpenseTable";
import ExpenseModal from "../components/expense/ExpenseModal";
import { type Expense } from "../types/expense";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [page, setPage] = useState(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/expenses", {
        params: {
          page,
          limit: 10,
          search,
          category,
        },
      });

      setExpenses(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [page, category]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      fetchExpenses();
    }, 500);
  }, [search]);

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setModalOpen(true);
  };

  const handleDeleteExpense = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );
    if (!confirmed) return;
    try {
      await api.delete(`/expenses/${id}`);

      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg text-gray-900 dark:text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Expenses</h1>
          <button
            onClick={handleAddExpense}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 hover:cursor-pointer"
          >
            Add Expense
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-2 flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="FOOD">Food</option>
            <option value="TRAVEL">Travel</option>
            <option value="BILLS">Bills</option>
            <option value="SHOPPING">Shopping</option>
            <option value="HEALTH">Health</option>
            <option value="ENTERTAINMENT">Entertainment</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        {loading ? (
          <div>Loading expenses...</div>
        ) : expenses.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            No expenses found
          </div>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />
        )}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {page} of {pagination.totalPages}
            </span>

            <button
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        <ExpenseModal
          open={modalOpen}
          expense={selectedExpense}
          onClose={() => setModalOpen(false)}
          onSuccess={fetchExpenses}
        />
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
