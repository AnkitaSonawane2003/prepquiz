import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/testTake.css"; // reuse same styles

const ViewAttempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAttempt = async () => {
      try {
        setLoading(true);
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("studentToken") ||
          localStorage.getItem("jwt");
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate("/studentlogin");
          return;
        }

        // ✅ Fetch the student's submitted attempt for this test
        const { data } = await API.get(`/api/testattempts/${testId}/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAttempt(data.attempt || data);
      } catch (err) {
        console.error("❌ Error loading attempt:", err);
        setError(
          err?.response?.data?.message ||
            "Failed to load your submission details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [testId]);

  if (loading) return <div className="tt-loading">Loading submission...</div>;
  if (error)
    return (
      <div className="test-take-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/student/tests")} className="btn">
          Back
        </button>
      </div>
    );

  if (!attempt) return <div>No attempt found for this test.</div>;

  const { test, answers, totalObtained, totalMarks } = attempt;

  return (
    <div className="test-take-container">
      <header className="tt-header">
        <h1>{test?.title} — Your Submission</h1>
        <h3>
          Score: {totalObtained}/{totalMarks}
        </h3>
      </header>

      <ol className="tt-questions">
        {test?.questions?.map((q, idx) => {
          const key = q._id || `q_${idx}`;
          const selected = answers?.[key];
          const correct = q.correctAnswer;

          return (
            <li key={key}>
              <div className="q-text">
                <strong>{idx + 1}.</strong> {q.text}
              </div>
              <div className="options">
                {q.options.map((opt, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isSelected = selected === letter;
                  const isCorrect = correct === letter;
                  return (
                    <div
                      key={i}
                      className={`option-label view-mode ${
                        isCorrect
                          ? "correct"
                          : isSelected && !isCorrect
                          ? "incorrect"
                          : ""
                      }`}
                    >
                      <span>
                        {letter}. {opt}
                      </span>
                      {isCorrect && <span> ✅</span>}
                      {isSelected && !isCorrect && <span> ❌</span>}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>

      <button className="btn" onClick={() => navigate("/student/tests")}>
        Back to Tests
      </button>
    </div>
  );
};

export default ViewAttempt;
