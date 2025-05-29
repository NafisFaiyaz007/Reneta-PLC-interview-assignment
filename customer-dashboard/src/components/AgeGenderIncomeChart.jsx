import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * @component AgeGenderIncomeChart
 * @description Displays a grouped bar chart showing average income by age group and gender.
 * @param {object} props
 * @param {object[]} props.data - Array of customer objects with age, gender, and income.
 * @returns {JSX.Element}
 */
const AgeGenderIncomeChart = ({ data }) => {
  // Define age bins
  const ageBins = [
    { name: '0-20', min: 0, max: 20 },
    { name: '21-30', min: 21, max: 30 },
    { name: '31-40', min: 31, max: 40 },
    { name: '41-50', min: 41, max: 50 },
    { name: '51-60', min: 51, max: 60 },
    { name: '60+', min: 61, max: Infinity }
  ];

  // Prepare data structure: { ageGroup: { M: {sum, count}, F: {sum, count} } }
  const grouped = {};
  ageBins.forEach(bin => {
    grouped[bin.name] = { M: { sum: 0, count: 0 }, F: { sum: 0, count: 0 } };
  });

  data.forEach(user => {
    const age = user.age;
    const gender = user.gender;
    const income = user.income;
    const bin = ageBins.find(b => age >= b.min && age <= b.max);
    if (bin && (gender === 'M' || gender === 'F')) {
      grouped[bin.name][gender].sum += income;
      grouped[bin.name][gender].count += 1;
    }
  });

  // Prepare chart data
  const chartData = ageBins.map(bin => {
    const male = grouped[bin.name]['M'];
    const female = grouped[bin.name]['F'];
    return {
      ageGroup: bin.name,
      Male: male.count > 0 ? Math.round(male.sum / male.count) : 0,
      Female: female.count > 0 ? Math.round(female.sum / female.count) : 0
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="ageGroup" tick={{ fill: '#9ca3af' }} />
        <YAxis tick={{ fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '0.5rem' }}
          labelStyle={{ color: '#e5e7eb', fontWeight: 'bold' }}
          itemStyle={{ color: '#d1d5db' }}
        />
        <Legend wrapperStyle={{ color: '#9ca3af' }} />
        <Bar dataKey="Male" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Female" fill="#f472b6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AgeGenderIncomeChart;