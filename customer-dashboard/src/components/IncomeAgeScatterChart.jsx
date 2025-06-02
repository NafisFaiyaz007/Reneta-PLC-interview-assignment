import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const IncomeAgeScatterChart = ({ data }) => {
  const filteredData = data
    .filter((c) => c.income > 0 && c.age > 0)
    .map((c) => ({
      ...c,
      name: c.name,
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="age"
          name="Age"
          unit=" yrs"
          tick={{ fill: "#9ca3af" }}
        />
        <YAxis
          type="number"
          dataKey="income"
          name="Income"
          unit=" ৳"
          tick={{ fill: "#9ca3af" }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name, props) => {
            if (name === "income") return [`${value} ৳`, "Income"];
            if (name === "age") return [`${value} yrs`, "Age"];
            return [value, name];
          }}
          labelFormatter={(label, payload) => {
            const customer = payload?.[0]?.payload;
            return `Name: ${customer?.name}`;
          }}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
          }}
          labelStyle={{ color: "#e5e7eb", fontWeight: "bold" }}
          itemStyle={{ color: "#d1d5db" }}
        />
        <Legend />
        <Scatter
          name="Customers"
          data={filteredData}
          fill="#34d399"
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default IncomeAgeScatterChart;
