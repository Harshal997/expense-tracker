import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/summary");
      const [summaryRes, chartRes, pieRes] = await Promise.all([
        api.get("/dashboard/summary"),
        api.get("/dashboard/chart"),
        api.get("/dashboard/category-chart"),
      ]);

      setSummary(summaryRes.data);
      setChartData(chartRes.data);
      setPieData(pieRes.data);
      setSummary(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Expenses"
            value={`₹${summary.totalExpenses}`}
          />
          <StatCard
            title="Monthly Expenses"
            value={`₹${summary.monthlyExpenses}`}
          />
          <StatCard title="Transactions" value={summary.transactionCount} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpenseChart data={chartData} />
          <CategoryPieChart data={pieData} />
        </div>
        <RecentTransactions expenses={summary.recentTransactions} />
      </div>
    </DashboardLayout>
  );
}
