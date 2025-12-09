import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/StudentTests.css";

const StudentTests = () => {
  const [tests, setTests] = useState([]);
  const [submittedTests, setSubmittedTests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestsAndAttempts = async () => {
      try {
        setLoading(true);

        const { data: testData } = await API.get("/api/tests");
        let list = [];

        if (Array.isArray(testData)) list = testData;
        else if (Array.isArray(testData.tests)) list = testData.tests;
        else if (Array.isArray(testData.data)) list = testData.data;
        else if (Array.isArray(testData.testsList)) list = testData.testsList;
        else if (testData && testData.success && Array.isArray(testData.payload))
          list = testData.payload;
        else if (testData && testData.success && testData.test)
          list = [testData.test];
        else if (testData.tests) list = testData.tests;
        else list = [];

        setTests(list);

        try {
          const { data: attemptData } = await API.get("/api/testAttempts/my");
          const attempts = attemptData.attempts || attemptData || [];
          const submittedIds = attempts.map((a) => a.test?._id || a.test);
          setSubmittedTests(submittedIds);
        } catch (attemptErr) {
          console.warn("⚠️ Could not fetch attempts (non-blocking):", attemptErr);
          setSubmittedTests([]);
        }
      } catch (err) {
        console.error("❌ Error fetching tests:", err);
        setError("Failed to load tests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestsAndAttempts();
  }, []);

  const handleStart = (test) => {
    if (!test || !test._id) {
      alert("This test is not available to start.");
      return;
    }
    navigate(`/student/tests/${test._id}`);
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "TBA";
    try {
      const d = new Date(dateStr);
      return d.toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="student-tests-layout">
      <div className="student-tests-content">
        <div className="header">
          <h1 className="page-title">🧩 Upcoming Tests</h1>
          <p className="page-subtitle">
            Stay prepared — your next challenges await!
          </p>
        </div>

        {loading ? (
          <div className="loader">
            <div className="spinner" />
            <p>Loading tests...</p>
          </div>
        ) : error ? (
          <div className="no-tests">
            <h3>{error} 📡</h3>
          </div>
        ) : tests.length === 0 ? (
          <div className="no-tests">
            <h3>No tests available at the moment 📭</h3>
          </div>
        ) : (
          <div className="test-grid">
            {tests.map((test) => {
              const isSubmitted = submittedTests.includes(test._id);
              return (
                <div key={test._id || test.id} className="test-card">
                  <div className="test-header">
                    <h2>{test.title || "Untitled Test"}</h2>
                    <span className="subject-tag">
                      {test.subject || "General"}
                    </span>
                  </div>

                  <div className="test-details">
                    <p>
                      <strong>Type:</strong> {test.type || "N/A"}
                    </p>
                    <p>
                      <strong>Total Marks:</strong> {test.totalMarks ?? "—"}
                    </p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {test.duration ? `${test.duration} mins` : "—"}
                    </p>
                    <p>
                      <strong>Date:</strong> {formatDateTime(test.date)}
                    </p>
                  </div>

                  {isSubmitted ? (
  <button
    className="start-btn"
    onClick={() => navigate(`/student/tests/${test._id}/view`)}
  >
    👀 View Submission
  </button>
) : (
  <button className="start-btn" onClick={() => handleStart(test)}>
    Take Test 🚀
  </button>
)}

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTests;
