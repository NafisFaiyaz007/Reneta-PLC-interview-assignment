import React from 'react';

/**
 * @component ChartContainer
 * @description A wrapper component to provide consistent styling for charts.
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the chart.
 * @param {JSX.Element} props.children - The chart component to be rendered inside the container.
 * @returns {JSX.Element}
 */
const ChartContainer = ({ title, children }) => (
  <div className="bg-[#1e293b] p-4 md:p-6 rounded-lg shadow-xl h-full flex flex-col">
    <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-100">{title}</h2>
    <div className="flex-grow relative min-h-[300px]">
      {children}
    </div>
  </div>
);

export default ChartContainer;