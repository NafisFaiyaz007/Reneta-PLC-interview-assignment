import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * @component DivisionIncomeChart
 * @description A pie chart to display the total income for each division.
 * @param {object} props - The component's props.
 * @param {object[]} props.data - Data for division incomes, array of objects with 'division' and 'income'.
 * @returns {JSX.Element}
 */
const DivisionIncomeChart = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const chartData = data.map(item => ({ name: item.division, value: item.income }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '0.5rem' }}
          labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
          itemStyle={{ color: '#d1d5db' }}
        />
        <Legend wrapperStyle={{ color: '#9ca3af', paddingTop: '10px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DivisionIncomeChart;