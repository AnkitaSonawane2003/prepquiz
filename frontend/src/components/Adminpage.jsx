import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "../styles/admin.css";
import "../styles/sidebar.css";

const Adminpage = () => {
  // Mock data for dashboard summary
  const studentCount = 120;
  const teacherCount = 8;
  const totalTests = 45;
  const totalDoubts = 67;

  const announcements = [
    "Maintenance scheduled on Oct 20.",
    "New student batch enrollment starts Oct 15.",
  ];

  return (
    <div className="student-page-container">
      {/* Sidebar */}
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Admin Portal</h2>
        <ul className="unified-nav-links">
          <li>
            <NavLink to="/adminpage" >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/studdata" >
              Student Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/tests">
              Teacher Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/doubt" >
              Doubts Section
            </NavLink>
          </li>
          <li>
            <NavLink to="/testcount" >
              Tests Evaluation
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" >
              Add Announcement
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Dashboard Summary */}
        <div className="summary-card">
          <div className="summary-name">Overview</div>
          <div className="summary-stats">
            <div className="summary-item">
              <div className="summary-number">{studentCount}</div>
              <div className="summary-label">Students</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{teacherCount}</div>
              <div className="summary-label">Teachers</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{totalTests}</div>
              <div className="summary-label">Total Tests</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{totalDoubts}</div>
              <div className="summary-label">Doubts Raised</div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <section className="dashboard-section">
          <h3>Latest Announcements</h3>
          <ul className="announcement-list">
            {announcements.map((announcement, idx) => (
              <li key={idx}>{announcement}</li>
            ))}
          </ul>
        </section>

        {/* Nested route outlet */}
        <Outlet />
      </main>
    </div>
  );
};

export default Adminpage;
