import React from "react";

const DataTable = ({ data }) => (
  <div className="bg-gray-100 bg-opacity-50 p-4 rounded-lg shadow-md mt-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-200">Customer List</h2>
    <div className="overflow-auto max-h-[400px]">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-700">
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
          {data.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-500 text-gray-800 font-semibold"
            >
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
);

export default DataTable;
