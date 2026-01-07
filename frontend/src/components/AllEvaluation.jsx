import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/allevaluate.css";

const AllEvaluations = () => {
  const [codingEvaluations, setCodingEvaluations] = useState([]);
  const [testEvaluations, setTestEvaluations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCodingEvaluations = async () => {
      try {
        const res = await axios.get("https://prepquiz.onrender.com/api/submissions/all-evaluations");
        const data = res.data || [];

        const grouped = {};
        data.forEach(item => {
          if (!grouped[item.email]) {
            grouped[item.email] = {
              email: item.email,
              fullName: item.fullName,
              totalSubmissions: 0,
              lastSubmission: null,
              submissions: [], 
            };
          }
          grouped[item.email].totalSubmissions += item.totalSubmissions;

    
          grouped[item.email].submissions.push({
            problemName: item.problemName,
            lastSubmission: item.lastSubmission ? new Date(item.lastSubmission) : null,
          });

       
          const itemLast = new Date(item.lastSubmission);
          if (!grouped[item.email].lastSubmission || itemLast > grouped[item.email].lastSubmission) {
            grouped[item.email].lastSubmission = itemLast;
          }
        });

        setCodingEvaluations(Object.values(grouped));
      } catch (err) {
        console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
      }
    };
    fetchCodingEvaluations();
  }, []);


  useEffect(() => {
    const fetchTestEvaluations = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("teacherToken");
        if (!token) {
          localStorage.removeItem("token");
          localStorage.removeItem("teacherToken");
          navigate("/login");
          return;
        }

        const res = await axios.get("https://prepquiz.onrender.com/api/testAttempts/per-student", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const attempts = res.data?.attempts ?? [];
        setTestEvaluations(Array.isArray(attempts) ? attempts : []);
      } catch (err) {
        console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
        if (err.response?.status === 401) {
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
    totalSubmissions: data.reduce((acc, e) => acc + e.totalSubmissions, 0),
    avgSubmissions: data.length
      ? (data.reduce((acc, e) => acc + e.totalSubmissions, 0) / data.length).toFixed(1)
      : 0,
  });

  const codingStats = renderStats(codingEvaluations);
  const testStats = renderStats(testEvaluations);

  const formatDateTime = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      : "-";
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Overall Students Evaluation</h1>

      
      <h2>Coding Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {codingEvaluations.map((student, index) => (
          <div key={index} className="student-card">
            <p>👤 Student: <strong>{student.fullName}</strong></p>
            <p>📧 Email: {student.email}</p>
            <p>🧮 Total Submissions: <strong>{student.totalSubmissions}</strong></p>
            {student.lastSubmission && (
              <p>🕒 Last Submission: {formatDateTime(student.lastSubmission)}</p>
            )}

           
            <div className="attempts-list">
              {student.submissions.map((problem, idx) => (
                <p key={idx}>
                  📌 Problem: <strong>{problem.problemName}</strong> | 🕒 Last Submission: {formatDateTime(problem.lastSubmission)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>


      <h2>Test Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{testStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {testEvaluations.map((student) => (
          <div key={student._id} className="student-card">
            <p>👤 Name: <strong>{student.fullName}</strong></p>
            <p>📧 Student: {student.email}</p>
            <p>🧮 Total Submissions: <strong>{student.totalSubmissions}</strong></p>
            {student.lastSubmission && (
              <p>🕒 Last Submission: {formatDateTime(student.lastSubmission)}</p>
            )}

          
            <div className="attempts-list">
              {student.attempts?.map((attempt, idx) => (
                <div key={idx} className="attempt-card">
                  <p>📝 Test: <strong>{attempt.testName}</strong> ({attempt.type})</p>
                  <p>🧮 Marks: {attempt.totalObtained} / {attempt.totalMarks}</p>
                  {attempt.date && <p>📅 Date: {formatDateTime(attempt.date)}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;

