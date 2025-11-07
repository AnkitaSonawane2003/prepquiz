import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/testTake.css";

const TestTake = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmitCallback = location.state?.onSubmit;

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [savedDraft, setSavedDraft] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState(null);
  const [started, setStarted] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState(null);

  const autosaveTimer = useRef(null);
  const countdownTimer = useRef(null);

  // ✅ Load test
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/tests/${testId}`);
        const theTest = data.test || data;
        if (!theTest || !theTest.questions) throw new Error("Invalid test data");
        setTest(theTest);

        const seconds =
          Number(theTest.duration) > 0
            ? Number(theTest.duration) * 60
            : 30 * 60;

        const saved = localStorage.getItem(`testAttempt_${testId}`);
        if (saved) {
          const obj = JSON.parse(saved);
          setSavedDraft({
            answers: obj.answers || {},
            timeLeft: obj.timeLeft ?? seconds,
          });
          setTimeLeft(obj.timeLeft ?? seconds);
        } else {
          setTimeLeft(seconds);
        }
      } catch (err) {
        setPageError(err.message || "Failed to load test");
      } finally {
        setLoading(false);
      }
    };
    load();

    return () => {
      clearInterval(autosaveTimer.current);
      clearInterval(countdownTimer.current);
    };
  }, [testId]);

  // ✅ Timer countdown
  useEffect(() => {
    if (!started || timeLeft === null) return;
    clearInterval(countdownTimer.current);
    countdownTimer.current = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(countdownTimer.current);
          handleSubmit(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(countdownTimer.current);
  }, [started]);

  // ✅ Autosave
  useEffect(() => {
    if (!started || submittedAttempt) return;
    clearInterval(autosaveTimer.current);
    autosaveTimer.current = setInterval(() => {
      localStorage.setItem(
        `testAttempt_${testId}`,
        JSON.stringify({ answers, timeLeft })
      );
    }, 10000);
    return () => clearInterval(autosaveTimer.current);
  }, [answers, timeLeft, started]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const selectOption = (qId, idx, letter) => {
    if (!started) return alert("Start the test first!");
    const key = qId || `q_${idx}`;
    setAnswers((prev) => ({ ...prev, [key]: letter }));
  };

  const changeTextAnswer = (qId, idx, text) => {
    if (!started) return alert("Start the test first!");
    const key = qId || `q_${idx}`;
    setAnswers((prev) => ({ ...prev, [key]: text }));
  };

  const startTest = (resume = false) => {
    if (resume && savedDraft) {
      setAnswers(savedDraft.answers || {});
      setTimeLeft(savedDraft.timeLeft ?? timeLeft);
    } else {
      setAnswers({});
    }
    setStarted(true);
  };

  // ✅ Submit
  const handleSubmit = async (auto = false) => {
    if (submitting || !test) return;
    if (!auto && !window.confirm("Are you sure you want to submit?")) return;

    setSubmitting(true);
    try {
      // ✅ Try all possible token keys
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("studentToken") ||
        localStorage.getItem("jwt") ||
        null;

      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/studentlogin");
        return;
      }

      const payload = {
        answers,
        timeTaken: (Number(test.duration) || 30) * 60 - (timeLeft ?? 0),
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await API.post(
        `/api/testAttempts/${testId}/submit`,
        payload,
        config
      );

      const returned = response.data?.attempt || response.data;
      clearInterval(autosaveTimer.current);
      localStorage.removeItem(`testAttempt_${testId}`);

      setSubmittedAttempt(returned);
      setStarted(false);
      clearInterval(countdownTimer.current);
      alert("✅ Test submitted successfully!");
    } catch (err) {
      console.error("❌ Submit error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Submission failed. Try again.";

      if (msg.includes("TOKEN_EXPIRED") || err?.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/studentlogin");
      } else {
        alert(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="tt-loading">Loading test...</div>;

  if (pageError)
    return (
      <div className="test-take-container">
        <h2>Error</h2>
        <p>{pageError}</p>
        <button onClick={() => navigate("/student/tests")} className="btn">
          Back
        </button>
      </div>
    );

  if (!test?.questions?.length)
    return (
      <div className="test-take-container">
        <h2>{test.title}</h2>
        <p>No questions found.</p>
        <button onClick={() => navigate("/student/tests")} className="btn">
          Back
        </button>
      </div>
    );

  if (submittedAttempt) {
    const score =
      submittedAttempt.totalObtained || submittedAttempt.score || 0;
    const total = submittedAttempt.totalMarks || test.totalMarks || 0;
    const percent = total ? ((score / total) * 100).toFixed(2) : null;

    return (
      <div className="test-take-container">
        <header className="tt-header">
          <h1>{test.title} — Result</h1>
        </header>
        <div className="result-summary">
          <h2>
            Score: {score}/{total} {percent ? `(${percent}%)` : ""}
          </h2>
        </div>
        <button className="btn" onClick={() => navigate("/student/tests")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="test-take-container">
      <header className="tt-header">
        <h1>{test.title}</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {!started && (
            <button
              className="btn start-btn"
              onClick={() => {
                if (savedDraft) {
                  const resume = window.confirm(
                    "Saved progress found. Resume it?"
                  );
                  startTest(resume);
                } else startTest(false);
              }}
            >
              ▶ Start Test
            </button>
          )}
          <div className="tt-timer">
            <strong>Time left:</strong> {formatTime(timeLeft ?? 0)}
          </div>
        </div>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(false);
        }}
      >
        <ol className="tt-questions">
          {test.questions.map((q, idx) => {
            const key = q._id || `q_${idx}`;
            const ans = answers[key] || "";
            return (
              <li key={key}>
                <div className="q-text">
                  <strong>{idx + 1}.</strong> {q.text}
                </div>
                {q.type === "MCQ" ? (
                  <div className="options">
                    {q.options?.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      return (
                        <label key={i} className="option-label">
                          <input
                            type="radio"
                            name={`q_${key}`}
                            disabled={!started || submitting}
                            checked={ans === letter}
                            onChange={() => selectOption(q._id, idx, letter)}
                          />
                          <span>
                            {letter}. {opt}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    rows={q.type === "Coding" ? 8 : 4}
                    disabled={!started || submitting}
                    value={ans}
                    onChange={(e) =>
                      changeTextAnswer(q._id, idx, e.target.value)
                    }
                    placeholder="Write your answer..."
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="tt-actions">
          <button
            type="submit"
            className="btn save-btn"
            disabled={!started || submitting}
          >
            {submitting ? "Submitting..." : "Submit Test"}
          </button>
          <button
            type="button"
            className="btn"
            disabled={!started || submitting}
            onClick={() => {
              localStorage.setItem(
                `testAttempt_${testId}`,
                JSON.stringify({ answers, timeLeft })
              );
              alert("Progress saved locally!");
            }}
          >
            Save Progress
          </button>
          <button
            type="button"
            className="btn"
            disabled={submitting}
            onClick={() => navigate("/student/tests")}
          >
            Quit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestTake;
