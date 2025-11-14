import React, { useState } from "react";
import axios from "axios";

const TestCard = ({ attempt, token }) => {
  const [topicAnalysis, setTopicAnalysis] = useState([]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [loading, setLoading] = useState(false);

  const testId = attempt.test?._id || attempt.test; // ✅ handle both populated and plain ID

  const fetchTopicAnalysis = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
       `http://localhost:5000/api/testattempts/${testId}/analysis`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        setTopicAnalysis(res.data.topicPerformance);
        setShowAnalysis(true);
      }
    } catch (err) {
      console.error("Error fetching topic-wise analysis:", err);
      alert("Unable to fetch topic-wise details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "15px 0",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "8px" }}>
        {attempt.test?.title || "Untitled Test"}
      </h3>

      <p style={{ color: "#555", margin: "4px 0" }}>
        ✅ <b>Score:</b> {attempt.totalMarksObtained || 0}/
        {attempt.totalMarks || 0}
      </p>
      <p style={{ color: "#555", margin: "4px 0" }}>
        📊 <b>Accuracy:</b>{" "}
        {attempt.totalQuestions
          ? (
              (attempt.correctAnswers / attempt.totalQuestions) *
              100
            ).toFixed(2)
          : 0}
        %
      </p>
      <p style={{ color: "#555", margin: "4px 0" }}>
        🧩 <b>Total Questions:</b> {attempt.totalQuestions || "N/A"}
      </p>

      <button
        onClick={fetchTopicAnalysis}
        disabled={loading}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {loading ? "Loading..." : "View Topic-wise Evaluation"}
      </button>

      {showAnalysis && topicAnalysis.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
          }}
        >
          <h4 style={{ color: "#444" }}>📘 Topic-wise Analysis</h4>
          {topicAnalysis.map((topic, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <p>
                <b>Topic:</b> {topic.name}
              </p>
              <p>
                ✅ <b>Correct:</b> {topic.correct} | ❌ <b>Wrong:</b>{" "}
                {topic.wrong}
              </p>
              <p>
                🧮 <b>Total Questions:</b> {topic.total}
              </p>
              <p>
                🏅 <b>Marks:</b> {topic.obtainedMarks}/{topic.totalMarks}
              </p>
              <p>
                📈 <b>Accuracy:</b> {topic.percentage}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCard;
