import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && role) {
      onLogin({ name: username, role });
    }
  };

  return (
    <div className="min-h-screen flex items-center shadow-2xl justify-center bg-gradient-to-b from-gray-900 from-0% via-slate-800 via-50% to-sky-900 to-100%">
      <form
        className="bg-white p-8 rounded shadow w-80"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Analytical Dashboard Login
        </h2>
        <div className="mb-4 shadow-2xl">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            className="w-full border border-cyan-800 rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6 shadow-2xl">
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full border border-cyan-800 rounded px-3 py-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-900 text-white py-2 rounded font-semibold hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;