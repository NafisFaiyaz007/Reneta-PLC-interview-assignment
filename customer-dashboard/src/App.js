import React, { useEffect, useState } from "react";
import customers from "./assets/customers.json";
import StatsCards from "./components/StatsCards";
import IncomeChart from "./components/IncomeChart";
import MaritalBarChart from "./components/MaritalBarChart";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

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
            <>
              <div className="card">
                <StatsCards data={data} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <IncomeChart data={data} />
                </div>
                <div className="card">
                  <MaritalBarChart data={data} />
                </div>
              </div>
            </>
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
