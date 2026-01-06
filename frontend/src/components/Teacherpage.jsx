import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Teacher.css";

const Teacherpage = () => {
  return (
    <div className="teacher-page-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Teacher Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/teacherpage" className={({ isActive }) => isActive ? "active-link" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacherprofile" className={({ isActive }) => isActive ? "active-link" : ""}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-test" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Test
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-coding" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Coding Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-reports" className={({ isActive }) => isActive ? "active-link" : ""}>
              Student Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/announcement" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Announcement
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>Welcome to Teacher Dashboard</h2>
        {/* Other dashboard widgets can go here */}
      </main>
    </div>
  );
};

export default Teacherpage;
