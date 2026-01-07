import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/student.css";


const StudentPage = () => {
  const studentEmail = localStorage.getItem("userEmail"); 
  const token = localStorage.getItem("studentToken");

  const [testsAttempted, setTestsAttempted] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [recentTests, setRecentTests] = useState([]);
  const [recentChallenges, setRecentChallenges] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);


  const motivationalThought1 =
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill";
  const motivationalThought2 =
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson";

  useEffect(() => {
    if (!studentEmail) return;

    async function fetchTestsAttempted() {
      try {
        const res = await fetch("https://prepquiz.onrender.com/api/testattempts/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.attempts)) {
          setTestsAttempted(data.attempts.length);
        }
      } catch (err) {
        console.error(err);
      }
    }
const token = localStorage.getItem("studentToken");
if (token) {
  async function fetchProfile() {
    try {
      const res = await fetch("https://prepquiz.onrender.com/api/student/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStudentProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }
  fetchProfile();
}
    async function fetchProblemsSolved() {
      try {
        const res = await fetch(
          `https://prepquiz.onrender.com/api/submissions/problems-solved/${studentEmail}`
        );
        const data = await res.json();
        if (data.success) setProblemsSolved(data.solvedCount);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchStudentStats() {
      try {
        const res = await fetch("https://prepquiz.onrender.com/api/student/stats?limit=3");
        const data = await res.json();
        if (data.success) {
          setRecentTests(data.recentTests || []);
          setRecentChallenges(data.recentChallenges || []);
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchAnnouncements() {
      try {
        const res = await fetch("https://prepquiz.onrender.com/api/announcement?limit=3");
        const data = await res.json();
        if (data.success) setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTestsAttempted();
    fetchProblemsSolved();
    fetchStudentStats();
    fetchAnnouncements();
  }, [studentEmail, token]);

  return (
    <div className="student-page-wrapper">
      {/* Sidebar */}
      <nav className="unified-sidebar">
        <h2 className="unified-sidebar-title">Student Portal</h2>
        <ul className="unified-nav-links">
          <li>
            <NavLink to="/studentpage" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentprofile" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentmodules" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Coding Practice
            </NavLink>
          </li>
          <li>
            <NavLink to="/studenttests" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/studentevaluation" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Evaluation
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <main className="main-content">

          <div className="summary-card">
<div className="summary-name">
  Performance Summary {studentProfile ? `for ${studentProfile.fullName}` : ""}
</div>
            <div className="summary-stats">
              <div className="summary-item">
                <div className="summary-number">{testsAttempted}</div>
                <div className="summary-label">Tests Attempted</div>
              </div>
              <div className="summary-item">
                <div className="summary-number">{problemsSolved}</div>
                <div className="summary-label">Coding Problems Solved</div>
              </div>
            </div>
          </div>

          <section className="dashboard-section">
            <h3>Recent Coding Challenges</h3>
            <ul className="practice-list">
              {recentChallenges.length > 0 ? (
                recentChallenges.map((ch) => (
                  <li key={ch._id}>
                    {ch.title} - <strong>{new Date(ch.createdAt).toLocaleDateString()}</strong>
                  </li>
                ))
              ) : (
                <li>No recent coding challenges available</li>
              )}
            </ul>
          </section>

          <section className="dashboard-section">
            <h3>Recent Tests</h3>
            <ul className="test-list">
              {recentTests.length > 0 ? (
                recentTests.map((test) => (
                  <li key={test._id}>
                    {test.title} - <strong>{new Date(test.date).toLocaleDateString()}</strong>
                  </li>
                ))
              ) : (
                <li>No recent tests available</li>
              )}
            </ul>
          </section>

          <div className="motivation-cards-container">
            <div className="motivation-card" title={motivationalThought1}>
              <p>{motivationalThought1}</p>
            </div>
            <div className="motivation-card" title={motivationalThought2}>
              <p>{motivationalThought2}</p>
            </div>
          </div>

   
          <section className="dashboard-section">
            <h3>Announcements</h3>
            <ul className="announcement-list">
              {announcements.length > 0 ? (
                announcements.map((item) => (
                  <li key={item._id || item.id}>{item.message}</li>
                ))
              ) : (
                <li>No announcements available</li>
              )}
            </ul>
          </section>
        </main>

       
      </div>
    </div>
  );
};

export default StudentPage;
