import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncomeChart = ({ data }) => {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.division]) grouped[item.division] = [];
    grouped[item.division].push(item.income);
  });

  const chartData = Object.keys(grouped).map((key) => ({
    division: key,
    AvgIncome:
      grouped[key].reduce((sum, val) => sum + val, 0) / grouped[key].length,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl text-black mb-2 font-bold">Average Income by division</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="division" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="AvgIncome" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default IncomeChart;
