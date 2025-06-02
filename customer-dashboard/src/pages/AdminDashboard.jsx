import React, { useState } from "react";
import customerData from "../assets/customers.json";

import FilterSelect from "../components/FilterSelect";
import DataTable from "../components/DataTable";
import GenderDistribution from "../components/GenderDistribution";
import IncomeChart from "../components/IncomeChart";
import MaritalStatusChart from "../components/MaritalStatusChart";
import ChartContainer from "../components/ChartContainer";
import AgeDistributionChart from "../components/AgeDistributionChart";
import AgeGenderIncomeChart from "../components/AgeGenderIncomeChart";


const AdminDashboard = () => {
  const [divisionFilter, setDivisionFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");

  const filteredData = customerData.filter(
    (user) =>
      (divisionFilter === "All" || user.division === divisionFilter) &&
      (genderFilter === "All" || user.gender === genderFilter)
  );

  const incomeByDivision = filteredData.reduce((acc, curr) => {
    acc[curr.division] = (acc[curr.division] || 0) + curr.income;
    return acc;
  }, {});
  const incomeData = Object.entries(incomeByDivision).map(
    ([division, income]) => ({ division, income })
  );

  const genderDistribution = filteredData.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});
  const genderData = Object.entries(genderDistribution).map(
    ([gender, value]) => ({ name: gender, value })
  );

  const maritalStatusData = filteredData.map((user) => ({
    maritalStatus: user.maritalStatus,
    income: user.income,
    age: user.age,
  }));

  // Data for AgeDistributionChart (pass raw filteredData, processing is internal)
  const ageDistributionData = filteredData;

  // Data for DivisionIncomeChart (uses incomeData which is already {division, income})
  // const divisionIncomeData = incomeData;

  const divisions = [...new Set(customerData.map((user) => user.division))];

  return (
    <div className="min-h-screen bg-opacity-0 text-white px-4 py-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Filters */}
        <div className="bg-[#2a2e45] p-4 rounded-lg shadow-md flex flex-wrap gap-y-4">
          <FilterSelect
            label="Division"
            options={["All", ...divisions]}
            onChange={setDivisionFilter}
          />
          <FilterSelect
            label="Gender"
            options={["All", "M", "F"]}
            onChange={setGenderFilter}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          <GenderDistribution data={genderData} />
          <MaritalStatusChart data={maritalStatusData} />
          <ChartContainer title="Age Group Count">
            <AgeDistributionChart data={ageDistributionData} />
          </ChartContainer>

          <ChartContainer title="Avg Income by Age Group & Gender vs income">
            <AgeGenderIncomeChart data={filteredData} />
          </ChartContainer>
        </div>

        <IncomeChart data={incomeData} />

        {/* Table */}
        <DataTable data={filteredData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
