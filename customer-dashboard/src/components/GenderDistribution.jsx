import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export default function GenderDistribution({ data }) {
  const COLORS = ["#e94560", "#2d3561"];

  // Calculate total to derive percentages
  const total = data.reduce((acc, item) => acc + item.value, 0);

  // Label formatter to show percentage
  const renderCustomizedLabel = ({ value }) =>
    `${((value / total) * 100).toFixed(1)}%`;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow h-64">
      <h3 className="text-lg text-black font-semibold mb-4">
        Gender Distribution
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={10}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${value} (${((value / total) * 100).toFixed(1)}%)`,
              name === "M" ? "Male" : name === "F" ? "Female" : name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) =>
              value === "M" ? "Male" : value === "F" ? "Female" : value
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
