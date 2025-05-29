import React, { useEffect, useState } from "react";
import customers from "./assets/customers.json";
import StatsCards from "./components/StatsCards";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); // {role: 'Admin'|'Sales'|'Other', name: string}

  useEffect(() => {
    setData(customers);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #181c2f 0%, #232946 100%)'}}>
      <Sidebar user={user} />
      <div style={{marginLeft: 220}}>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="p-4 max-w-5xl mx-auto">
          {user.role === "Admin" && (
            <AdminDashboard />
          )}
          {user.role === "Sales" && (
            <div className="card text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome, Sales Representative!</h2>
              <p className="mb-4">You have limited view permissions. Please contact admin for more access.</p>
              <StatsCards data={data} />
            </div>
          )}
          {user.role === "Other" && (
            <div className="card text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
              <p className="mb-4">You have limited access. Please contact admin for more information.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
