import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "../styles/teacher.css";
import "../styles/teacherstyle.css";

function TeacherPage() {
  // ✅ Teacher stats
  const [stats, setStats] = useState({
    testsCreated: 0,
    codingChallengesCreated: 0,
    recentTests: [],
    recentChallenges: [],
  });

  // ✅ Overview states
  const [totalCodeSubmissions, setTotalCodeSubmissions] = useState(0);
  const [totalTestsSubmitted, setTotalTestsSubmitted] = useState(0);

  // ✅ UI toggles
  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllChallenges, setShowAllChallenges] = useState(false);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);

  // ✅ Announcements
  const [announcements, setAnnouncements] = useState([]);

  // ✅ Motivational quotes
  const motivationalQuotes = [
    "Teaching is the one profession that creates all other professions.",
    "A good teacher is like a candle — it consumes itself to light the way for others."
  ];

  // Fetch teacher stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`http://localhost:5000/api/teacher/stats?limit=${showAllTests || showAllChallenges ? 50 : 3}`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    }
    fetchStats();
  }, [showAllTests, showAllChallenges]);

  // Fetch total code submissions
  useEffect(() => {
    async function fetchCodeSubmissions() {
      try {
        const res = await fetch("http://localhost:5000/api/evaluation/all-evaluations");
        const data = await res.json();
        if (Array.isArray(data)) {
          const total = data.reduce((acc, evalItem) => acc + (evalItem.totalSubmissions || 0), 0);
          setTotalCodeSubmissions(total);
        }
      } catch (err) {
        console.error("Error fetching code submissions:", err);
      }
    }
    fetchCodeSubmissions();
  }, []);

  // Fetch total tests submitted by students
  useEffect(() => {
    async function fetchTotalTestsSubmitted() {
      try {
        const res = await fetch("http://localhost:5000/api/testAttempts/total-submitted", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setTotalTestsSubmitted(data.totalSubmitted);
        }
      } catch (err) {
        console.error("Error fetching total test submissions:", err);
      }
    }
    fetchTotalTestsSubmitted();
  }, []);

  // Fetch announcements
  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('http://localhost:5000/api/announcement');
        const data = await res.json();
        if (data.success) {
          setAnnouncements(data.announcements);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    }
    fetchAnnouncements();
  }, []);

  const { testsCreated, codingChallengesCreated, recentTests, recentChallenges } = stats;

  return (
    <div className="teacher-page-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Teacher Portal</h2>
        <ul className="nav-links">
          <li><NavLink to="/teacherprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>Profile</NavLink></li>
          <li><NavLink to="/add-test" className={({ isActive }) => isActive ? "active-link" : ""}>Add Tests</NavLink></li>
          <li><NavLink to="/add-aptitude" className={({ isActive }) => isActive ? "active-link" : ""}>Add Problems</NavLink></li>
          <li><NavLink to="/studdata" className={({ isActive }) => isActive ? "active-link" : ""}>Student Data</NavLink></li>
          <li><NavLink to="/allevaluation" className={({ isActive }) => isActive ? "active-link" : ""}>Student Evaluation</NavLink></li>
          <li><NavLink to="/announce" className={({ isActive }) => isActive ? "active-link" : ""}>Add Alert</NavLink></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="teacher-main-content">
        {/* Overview */}
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
              <div className="summary-number">{totalTestsSubmitted}</div>
              <div className="summary-label">Total Tests Submitted by Students</div>
            </div>
            <div className="summary-item">
              <div className="summary-number">{totalCodeSubmissions}</div>
              <div className="summary-label">Total Codes Submitted by Students</div>
            </div>
          </div>
        </div>

        {/* Recent Tests */}
        <section className="dashboard-section">
          <h3>Recent Tests</h3>
          <ul className="schedule-list">
            {(showAllTests ? recentTests : recentTests.slice(0, 3)).map((item) => (
              <li key={item._id || item.id}>
                {item.title} - <strong>{new Date(item.date || item.createdAt).toLocaleDateString()}</strong>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowAllTests(!showAllTests)} className="view-btn">
            {showAllTests ? "Show Less" : "View All"}
          </button>
        </section>

        {/* Recent Coding Challenges */}
        <section className="dashboard-section">
          <h3>Recent Coding Challenges</h3>
          <ul className="schedule-list">
            {(showAllChallenges ? recentChallenges : recentChallenges.slice(0, 3)).map((ch) => (
              <li key={ch._id || ch.id}>
                {ch.title || ch.event} - <strong>{new Date(ch.createdAt || ch.date).toLocaleDateString()}</strong>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowAllChallenges(!showAllChallenges)} className="view-btn">
            {showAllChallenges ? "Show Less" : "View All"}
          </button>
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
            {(showAllAnnouncements ? announcements : announcements.slice(0, 3)).length > 0 ? (
              (showAllAnnouncements ? announcements : announcements.slice(0, 3)).map(item => (
                <li key={item._id || item.id}>{item.message}</li>
              ))
            ) : (
              <li>No announcements available</li>
            )}
          </ul>
          <button onClick={() => setShowAllAnnouncements(!showAllAnnouncements)} className="view-btn">
            {showAllAnnouncements ? "Show Less" : "View All"}
          </button>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default TeacherPage;
