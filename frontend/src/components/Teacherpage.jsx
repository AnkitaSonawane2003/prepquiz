import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/teacher.css";
import "../styles/sidebar.css";

function TeacherPage() {
  return (
    <div className="teacher-page-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Teacher Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink end to="dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="teacherprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="tests" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Add Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="add-aptitude" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Add Problems
            </NavLink>
          </li>
          <li>
            <NavLink to="studdata" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Student Data
            </NavLink>
          </li>
          <li>
            <NavLink to="student-evaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Student Evaluation
            </NavLink>
          </li>
          <li>
            <NavLink to="announce" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Add Announcement
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="teacher-main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default TeacherPage;
