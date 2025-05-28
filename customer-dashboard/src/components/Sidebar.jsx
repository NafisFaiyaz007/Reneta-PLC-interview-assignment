import React from "react";
import "../App.css";

const Sidebar = ({ user }) => (
  <aside className="sidebar">
    <div className="sidebar-title">Menu</div>
    <ul className="sidebar-list">
      <li>Dashboard</li>
      {user && user.role === "Admin" && <li>Admin Panel</li>}
      {user && user.role === "Sales" && <li>Sales Stats</li>}
      <li>Profile</li>
    </ul>
  </aside>
);

export default Sidebar;