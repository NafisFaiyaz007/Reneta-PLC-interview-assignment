import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const MaritalBarChart = ({ data }) => {
  const count = {};
  data.forEach((item) => {
    count[item.maritalStatus] = (count[item.maritalStatus] || 0) + 1;
  });

  const chartData = Object.keys(count).map((key) => ({
    name: key,
    value: count[key],
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2 font-bold">Marital Status Distribution</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          cx={150}
          cy={150}
          outerRadius={100}
          label
          dataKey="value"
        >
          {chartData.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};
export default MaritalBarChart;
