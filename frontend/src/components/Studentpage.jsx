import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/student.css";
import "../styles/sidebar.css"

const StudentPage = () => {
  // Mocked data
  const testsAttempted = 5;
  const problemsSolved = 12;
  const modulesCompleted = 8;

  const recentPractice = [
    { id: 1, title: "Arrays and Loops", completed: true },
    { id: 2, title: "React Components", completed: false },
    { id: 3, title: "JavaScript Promises", completed: true },
  ];

  const upcomingTests = [
    { id: 1, title: "Midterm Exam", date: "2025-10-25" },
    { id: 2, title: "React Basics Quiz", date: "2025-10-30" },
  ];

  const latestTestResults = [
    { id: 1, title: "JavaScript Fundamentals", score: 88, status: "Passed" },
    { id: 2, title: "HTML & CSS", score: 92, status: "Passed" },
  ];

  const motivationalThought1 =
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
  const motivationalThought2 =
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

  
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('http://localhost:5000/api/announcement?limit=3'); // Backend should support ?limit=3
        const data = await res.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    }

    fetchAnnouncements();
  }, []);

  return (
    <div className="student-page-container">
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Student Portal</h2>
        <ul className="unified-nav-links">
          <li>
           
            <NavLink
              to="/studentpage"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Dashboard
            </NavLink>
          </li>
           <li>
            <NavLink to="/studentprofile" activeClassName="active-link">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/studentmodules"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Coding Practice
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/studenttests"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Tests
            </NavLink>
          </li>
         
       
          <li>
            <NavLink
              to="/studentevaluation"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Evaluation
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {/* Performance Summary */}
        <div className="summary-card">
          <div className="summary-name">Performance Summary</div>
          <div className="summary-stats">
            <div className="summary-item">
              <div className="summary-number">{testsAttempted}</div>
              <div className="summary-label">Tests Attempted</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{problemsSolved}</div>
              <div className="summary-label">Problems Solved</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{modulesCompleted}</div>
              <div className="summary-label">Modules Completed</div>
            </div>
          </div>
        </div>

        {/* Recent Coding Practice */}
        <section className="dashboard-section">
          <h3>Recent Coding Practice</h3>
          <ul className="practice-list">
            {recentPractice.map((module) => (
              <li key={module.id} className={module.completed ? "completed" : ""}>
                {module.title} {module.completed ? "✓" : "⏳"}
              </li>
            ))}
          </ul>
        </section>

        {/* Upcoming Tests */}
        <section className="dashboard-section">
          <h3>Upcoming Tests</h3>
          <ul className="test-list">
            {upcomingTests.map((test) => (
              <li key={test.id}>
                {test.title} - <strong>{test.date}</strong>
              </li>
            ))}
          </ul>
        </section>

        {/* Latest Test Results */}
        <section className="dashboard-section">
          <h3>Latest Test Results</h3>
          <ul className="results-list">
            {latestTestResults.map((result) => (
              <li key={result.id}>
                {result.title}: <strong>{result.score}%</strong> ({result.status})
              </li>
            ))}
          </ul>
        </section>

        {/* Motivational Cards */}
        <div className="motivation-cards-container">
          <div className="motivation-card" title={motivationalThought1}>
            <p>{motivationalThought1}</p>
          </div>
          <div className="motivation-card" title={motivationalThought2}>
            <p>{motivationalThought2}</p>
          </div>
        </div>

        {/* Announcements */}
        <section className="dashboard-section">
      <h3>Announcements</h3>
      <ul className="announcement-list">
        {announcements.length > 0 ? (
          announcements.map(item => (
            <li key={item._id || item.id}>{item.message}</li>
          ))
        ) : (
          <li>No announcements available</li>
        )}
      </ul>
    </section>
      </main>
    </div>
  );
};

export default StudentPage;