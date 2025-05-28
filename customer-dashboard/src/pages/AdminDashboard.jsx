import React, { useState } from "react";
import customerData from "../data/customers.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const AdminDashboard = () => {
  const [divisionFilter, setDivisionFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");

  const filteredData = customerData.filter((user) => {
    return (
      (divisionFilter === "All" || user.division === divisionFilter) &&
      (genderFilter === "All" || user.gender === genderFilter)
    );
  });

  const incomeByDivision = filteredData.reduce((acc, curr) => {
    acc[curr.division] = (acc[curr.division] || 0) + curr.income;
    return acc;
  }, {});

  const genderDistribution = filteredData.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});

  const incomeData = Object.entries(incomeByDivision).map(
    ([division, income]) => ({ division, income })
  );
  const genderData = Object.entries(genderDistribution).map(
    ([gender, value]) => ({ name: gender, value })
  );

  const divisions = [...new Set(customerData.map((user) => user.division))];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div>
          <label className="block font-medium">Division:</label>
          <select
            onChange={(e) => setDivisionFilter(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="All">All</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block font-medium">Gender:</label>
          <select
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income by Division */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Income by Division</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <XAxis dataKey="division" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table of users */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Customer List</h2>
          <div className="overflow-auto max-h-[300px]">
            <table className="min-w-full border text-sm">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Division</th>
                  <th className="border px-4 py-2">Gender</th>
                  <th className="border px-4 py-2">Marital Status</th>
                  <th className="border px-4 py-2">Age</th>
                  <th className="border px-4 py-2">Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.division}</td>
                    <td className="border px-4 py-2">{user.gender}</td>
                    <td className="border px-4 py-2">{user.maritalStatus}</td>
                    <td className="border px-4 py-2">{user.age}</td>
                    <td className="border px-4 py-2">{user.income}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
