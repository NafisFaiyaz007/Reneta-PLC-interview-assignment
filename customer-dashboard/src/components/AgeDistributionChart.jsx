import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * @component AgeDistributionChart
 * @description A bar chart to display the distribution of customer ages.
 * @param {object} props - The component's props.
 * @param {object[]} props.data - Data for the age distribution, typically an array of objects with age ranges and counts.
 * @returns {JSX.Element}
 */
const AgeDistributionChart = ({ data }) => {
  // Define age bins
  const ageBins = [
    { name: '0-20', min: 0, max: 20, count: 0 },
    { name: '21-30', min: 21, max: 30, count: 0 },
    { name: '31-40', min: 31, max: 40, count: 0 },
    { name: '41-50', min: 41, max: 50, count: 0 },
    { name: '51-60', min: 51, max: 60, count: 0 },
    { name: '60+', min: 61, max: Infinity, count: 0 },
  ];

  // Process data to fit into age bins
  data.forEach(customer => {
    const age = customer.age;
    for (const bin of ageBins) {
      if (age >= bin.min && age <= bin.max) {
        bin.count++;
        break;
      }
    }
  });

  const chartData = ageBins.map(bin => ({ name: bin.name, Count: bin.count }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
        <YAxis tick={{ fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '0.5rem' }}
          labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
          itemStyle={{ color: '#d1d5db' }}
        />
        <Legend wrapperStyle={{ color: '#9ca3af' }} />
        <Bar dataKey="Count" fill="#8884d8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeDistributionChart;