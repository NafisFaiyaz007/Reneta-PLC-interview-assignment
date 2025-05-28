import React from "react";

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-title">Customer Dashboard</div>
    <div>
      {user && (
        <>
          <span className="navbar-user">{user.name} ({user.role})</span>
          <button className="navbar-logout" onClick={onLogout}>Logout</button>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;