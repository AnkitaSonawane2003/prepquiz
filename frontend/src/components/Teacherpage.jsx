import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // assuming React Router for navigation
import "../styles/Teacher.css";

const Teacherpage = () => {
  return (
    <div className="student-page-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Teacher Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink to="/tests" activeClassName="active-link">
            Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/modules" activeClassName="active-link">
              Add Test
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout">
              Add Coding question
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active-link">
              Student Reports
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

export default Teacherpage;
