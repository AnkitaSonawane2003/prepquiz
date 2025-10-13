import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Teacher.css";
import "../styles/sidebar.css"

const TeacherPage = () => {
  // Mocked data for teacher dashboard
  const codingChallengesCreated = 3;
  const testsCreated = 7;
  const testsSubmittedByStudents = 15;

  const recentTests = [
    { id: 1, title: "JavaScript Quiz #1", graded: true },
    { id: 2, title: "React Midterm", graded: false },
    { id: 3, title: "HTML & CSS Basics", graded: true },
  ];

  const recentCodingChallenges = [
    { id: 1, event: "Parent Meeting", date: "2025-10-20" },
    { id: 2, event: "New Test Release", date: "2025-10-28" },
  ];

  const motivationalQuotes = [
    "A good teacher can inspire hope, ignite the imagination, and instill a love of learning. – Brad Henry",
    "Teaching is the one profession that creates all other professions. – Unknown",
  ];

  const announcements = [
    { id: 1, message: "New grading tools available in the portal." },
    { id: 2, message: "Staff meeting scheduled for October 22nd." },
  ];

  return (
    <div className="teacher-page-container">
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Teacher Portal</h2>
        <ul className="unified-nav-links">
          <li>
            <NavLink to="/teacherpage" className={({ isActive }) => isActive ? "teacher-active-link" : ""}>
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink to="/teacherpage/profile" className={({ isActive }) => isActive ? "teacher-active-link" : ""}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacherpage/tests" className={({ isActive }) => isActive ? "teacher-active-link" : ""}>
              Add Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacherpage/assignments" className={({ isActive }) => isActive ? "teacher-active-link" : ""}>
          Add Coding Problem
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacherpage/assignments" className={({ isActive }) => isActive ? "teacher-active-link" : ""}>
       Studnet Data
            </NavLink>
          </li>
         
          <li>
            <NavLink to="/logout">
              Student Evaluation
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="teacher-main-content">
        {/* Performance Summary */}
        <div className="summary-card">
          <div className="summary-name">Performance Summary</div>
          <div className="summary-stats">
            <div className="summary-item">
              <div className="summary-number">{codingChallengesCreated}</div>
              <div className="summary-label">Coding Challenges Created</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{testsCreated}</div>
              <div className="summary-label">Tests Created</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{testsSubmittedByStudents}</div>
              <div className="summary-label">Tests Submitted by Students</div>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <section className="dashboard-section">
          <h3>Recent Tests</h3>
          <ul className="activity-list">
            {recentTests.map((item) => (
              <li key={item.id} className={item.graded ? "graded" : "pending"}>
                {item.title} {item.graded ? "✓" : "⏳"}
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Coding Challenges */}
        <section className="dashboard-section">
          <h3>Recent Coding Challenges</h3>
          <ul className="schedule-list">
            {recentCodingChallenges.map((event) => (
              <li key={event.id}>
                {event.event} - <strong>{event.date}</strong>
              </li>
            ))}
          </ul>
        </section>

        {/* Motivational Quotes */}
        <div className="motivation-cards-container">
          {motivationalQuotes.map((quote, index) => (
            <div className="motivation-card" key={index} title={quote}>
              <p>{quote}</p>
            </div>
          ))}
        </div>

        {/* Announcements */}
        <section className="dashboard-section">
          <h3>Announcements</h3>
          <ul className="announcement-list">
            {announcements.map((item) => (
              <li key={item.id}>{item.message}</li>
            ))}
          </ul>
        </section>

        <Outlet />
      </main>
    </div>
  );
};

export default TeacherPage;
