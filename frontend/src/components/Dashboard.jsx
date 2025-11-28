import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [codingStats, setCodingStats] = useState({
    challenges: 0,
    students: 0,
    submissions: 0,
  });

  const [testStats, setTestStats] = useState({
    testsCreated: 0,
    submissions: 0,
  });

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchCodingData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/evaluation/all-evaluations"
        );
        const data = res.data || [];
        setCodingStats({
          challenges: data.length,
          students: data.length,
          submissions: data.reduce(
            (acc, e) => acc + (e.totalSubmissions || 0),
            0
          ),
        });
      } catch (err) {
        console.error("Error fetching coding data:", err);
      }
    };

    fetchCodingData();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/testAttempts/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = res.data.attempts || [];
        setTestStats({
          testsCreated: new Set(data.map((t) => t.testId)).size,
          submissions: data.reduce(
            (acc, e) => acc + (e.totalSubmissions || 0),
            0
          ),
        });
      } catch (err) {
        console.error("Error fetching test data:", err);
      }
    };

    fetchTestData();
  }, []);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("http://localhost:5000/api/announcement?limit=3");
        const data = await res.json();
        if (data.success) setAnnouncements(data.announcements);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnnouncements();
  }, []);

  return (
    <>
  
      <div className="summary-card">
        <div className="summary-name">Overview</div>
        <div className="summary-stats">
          <div className="summary-item">
            <div className="summary-number">{codingStats.challenges}</div>
            <div className="summary-label">Coding Challenges Created</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{testStats.testsCreated}</div>
            <div className="summary-label">Tests Created</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">{testStats.submissions}</div>
            <div className="summary-label">Tests Submitted by Students</div>
          </div>
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
    </>
  );
}

export default Dashboard;
