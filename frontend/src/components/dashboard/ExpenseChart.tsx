import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: any[];
}

const ExpenseChart = ({ data }: Props) => {
  return (
    <div
      className="border rounded-lg p-4 bg-white

  dark:bg-gray-800
  dark:border-gray-700"
    >
      <h2 className="font-semibold mb-4 text-black dark:text-white">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="amount" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
