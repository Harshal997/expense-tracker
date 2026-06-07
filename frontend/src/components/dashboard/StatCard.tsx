interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <div
      className="border rounded-lg p-4 bg-white
  dark:bg-gray-800
  dark:border-gray-700"
    >
      <h3 className="text-gray-500">{title}</h3>

      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
