import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // assuming React Router for navigation
import "../styles/admin.css";
const Adminpage = () => {
  return (
    <div className="student-page-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Admin Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/modules" activeClassName="active-link">
              Student Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/tests" activeClassName="active-link">
           Teacher Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/doubt" activeClassName="active-link">
            Doubts Section
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              Tests count
            </NavLink>
          </li>
           <li>
                      <NavLink to="/profile" activeClassName="active-link">
                        Add Announcement
                      </NavLink>
                    </li>
        </ul>
      </nav>

      <main className="main-content">
        {/* This is where your dashboard or other components render */}
        <Outlet />
      </main>
    </div>
  );
};

export default Adminpage;
