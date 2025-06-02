import React from "react";
import "../App.css";

const Sidebar = ({ user }) => (
  <aside className="sidebar">
    <div className="sidebar-title">Menu</div>
    <ul className="sidebar-list">
      {user && user.role === "Admin" && <li>Admin Dashboard</li>}
      {user && user.role === "Customer" && <li>Customer Dashboard</li>}
      <li>Profile</li>
    </ul>
  </aside>
);

export default Sidebar;