
import React , { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "../styles/teacher.css";
import "../styles/sidebar.css"

function TeacherPage() {
  // Example placeholder data (replace with real data or state)
  const codingChallengesCreated = 5;
  const testsCreated = 3;
  const testsSubmittedByStudents = 10;

  const recentTests = [
    { id: 1, title: "Test 1", graded: true },
    { id: 2, title: "Test 2", graded: false },
  ];

  const recentCodingChallenges = [
    { id: 1, event: "Array Challenge", date: "2025-10-10" },
  ];

  const motivationalQuotes = ["Teaching is the one profession that creates all other professions", "A good teacher is like a candle — it consumes itself to light the way for others."];
  

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
    <div className="teacher-page-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Teacher Portal</h2>
        <ul className="nav-links">
          <li>
            <NavLink to="/teacherpage" className={({ isActive }) => isActive ? "active-link" : ""}>
              Dashboard
            </NavLink>
          </li>
          <li>
           <NavLink to="/teacherprofile"
                className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Profile
                      </NavLink>
          </li>
          <li>
            <NavLink to="/teacherpage/tests" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/teacherpage/assignments" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Problems
            </NavLink>
          </li>
          <li>
            <NavLink to="/studdata" className={({ isActive }) => isActive ? "active-link" : ""}>
              Student Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/student-evaluation" className={({ isActive }) => isActive ? "active-link" : ""}>
              Student Evaluation
            </NavLink>
          </li>
          <li>
            <NavLink to="/announce" className={({ isActive }) => isActive ? "active-link" : ""}>
              Add Announcement
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="teacher-main-content">
        {/* Performance Summary */}
        <div className="summary-card">
          <div className="summary-name">Overview</div>
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
        {announcements.length > 0 ? (
          announcements.map(item => (
            <li key={item._id || item.id}>{item.message}</li>
          ))
        ) : (
          <li>No announcements available</li>
        )}
      </ul>
    </section>

        <Outlet />
      </main>
    </div>
  );
}

export default TeacherPage;
