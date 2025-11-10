import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/allevaluate.css";

const AllEvaluations = () => {
  const [codingEvaluations, setCodingEvaluations] = useState([]);
  const [testEvaluations, setTestEvaluations] = useState([]);
  const navigate = useNavigate();

  // Fetch Coding Evaluations (public)
  useEffect(() => {
    const fetchCodingEvaluations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
        setCodingEvaluations(res.data || []);
      } catch (err) {
        console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
      }
    };
    fetchCodingEvaluations();
  }, []);

  // Fetch Test Evaluations (protected)
  useEffect(() => {
    const fetchTestEvaluations = async () => {
      try {
        // check multiple keys for compatibility
        const token = localStorage.getItem("token") || localStorage.getItem("teacherToken") || null;
        if (!token) {
          console.warn("No token found in localStorage. Redirecting to login.");
          localStorage.removeItem("token");
          localStorage.removeItem("teacherToken");
          navigate("/login"); // change to your login route if different
          return;
        }

        const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const attempts = res.data?.attempts ?? res.data ?? [];
        setTestEvaluations(Array.isArray(attempts) ? attempts : []);
      } catch (err) {
        console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
        if (err.response?.status === 401) {
          // token invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("teacherToken");
          navigate("/login");
        }
      }
    };
    fetchTestEvaluations();
  }, [navigate]);

  const renderStats = (data) => ({
    totalStudents: data.length,
    totalSubmissions: data.reduce((acc, e) => acc + (e.totalSubmissions || 0), 0),
    avgSubmissions: data.length ? (data.reduce((acc, e) => acc + (e.totalSubmissions || 0), 0) / data.length).toFixed(1) : 0,
  });

  const codingStats = renderStats(codingEvaluations);
  const testStats = renderStats(testEvaluations);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

      {/* --- Coding Evaluation --- */}
      <h2>Coding Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {codingEvaluations.map((user) => (
          <div key={user.email} className="student-card">
            <p>📧 {user.email}</p>
            <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
            <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* --- Test Evaluation --- */}
      <h2>Test Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{testStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {testEvaluations.map((user) => (
          <div key={user.email} className="student-card">
            <p>📧 {user.email}</p>
            <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
            <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;
