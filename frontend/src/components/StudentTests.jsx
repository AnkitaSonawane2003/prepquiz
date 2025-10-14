import React, { useEffect, useState } from "react";
import "../styles/studentTests.css";

const StudentTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tests from backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tests");
        const data = await res.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  return (
    <div className="student-tests-layout">
      {/* Keep sidebar as it is — layout aligns beside it */}
      <div className="student-tests-content">
        <div className="header">
          <h1 className="page-title">🧩 Upcoming Tests</h1>
          <p className="page-subtitle">Stay prepared — your next challenges await!</p>
        </div>

        {loading ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Loading tests...</p>
          </div>
        ) : tests.length === 0 ? (
          <div className="no-tests">
            <h3>No tests available at the moment 📭</h3>
          </div>
        ) : (
          <div className="test-grid">
            {tests.map((test) => (
              <div key={test._id} className="test-card">
                <div className="test-header">
                  <h2>{test.title}</h2>
                  <span className="subject-tag">{test.subject || "General"}</span>
                </div>
                <div className="test-details">
                  <p><strong>Type:</strong> {test.type}</p>
                  <p><strong>Total Marks:</strong> {test.totalMarks}</p>
                  <p><strong>Duration:</strong> {test.duration} mins</p>
                  <p><strong>Date:</strong> {new Date(test.date).toLocaleDateString()}</p>
                </div>
                <button className="start-btn">Start Test 🚀</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTests;
