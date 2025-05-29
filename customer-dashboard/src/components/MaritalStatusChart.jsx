import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const MaritalBarChart = ({ data }) => {
  const count = {};
  data.forEach((item) => {
    count[item.maritalStatus] = (count[item.maritalStatus] || 0) + 1;
  });

  const total = data.length;

  const chartData = Object.keys(count).map((key) => ({
    name: key,
    value: count[key],
    percent: ((count[key] / total) * 100).toFixed(1),
  }));

  const renderCustomizedLabel = ({ percent }) =>
    `${(percent * 1).toFixed(1)}%`;

  return (
    <div className="bg-white text-gray-800 p-4 rounded shadow w-full h-[400px]">
      <h2 className="text-xl mb-4 font-bold">Marital Status Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius="70%"
            label={renderCustomizedLabel}
            dataKey="value"
          >
            {chartData.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${value} (${props.payload.percent}%)`,
              name,
            ]}
          />
          <Legend verticalAlign="bottom" height={50} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaritalBarChart;
