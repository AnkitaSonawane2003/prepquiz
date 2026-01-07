import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import "../styles/testTake.css";

const TestTake = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [savedDraft, setSavedDraft] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState(null);
  const [started, setStarted] = useState(false);

  const [showSaved, setShowSaved] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
const [showResumeModal, setShowResumeModal] = useState(false);

  const autosaveTimer = useRef(null);
  const countdownTimer = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadTest = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/tests/${testId}`);
        const theTest = data.test || data;

        if (!mounted) return;
        setTest(theTest);

        const defaultSec = Number(theTest.duration) * 60 || 1800;
        const saved = localStorage.getItem(`testAttempt_${testId}`);

        if (saved) {
          const obj = JSON.parse(saved);
          setSavedDraft({
            answers: obj.answers || {},
            timeLeft: obj.timeLeft ?? defaultSec,
          });
          setTimeLeft(obj.timeLeft ?? defaultSec);
        } else {
          setTimeLeft(defaultSec);
        }
      } catch (err) {
        setPageError("Failed to load test. Try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadTest();

    return () => {
      mounted = false;
      clearInterval(autosaveTimer.current);
      clearInterval(countdownTimer.current);
    };
  }, [testId]);

  useEffect(() => {
    if (!started || timeLeft === null) return;

    countdownTimer.current = setInterval(() => {
      setTimeLeft((sec) => {
        if (sec <= 1) {
          clearInterval(countdownTimer.current);
          submitFinal(true);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(countdownTimer.current);
  }, [started]);

  useEffect(() => {
    if (!started || submittedAttempt) return;

    autosaveTimer.current = setInterval(() => {
      localStorage.setItem(
        `testAttempt_${testId}`,
        JSON.stringify({ answers, timeLeft })
      );
    }, 8000);

    return () => clearInterval(autosaveTimer.current);
  }, [answers, timeLeft, started]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTest = (resume = false) => {
    if (resume && savedDraft) {
      setAnswers(savedDraft.answers || {});
      setTimeLeft(savedDraft.timeLeft);
    } else {
      setAnswers({});
    }
    setStarted(true);
  };

  const selectOption = (qId, letter) => {
    if (!started) {
      alert("Start the test first!");
      return;
    }
    setAnswers((prev) => ({ ...prev, [qId]: letter }));
  };

  const submitFinal = async (auto = false) => {
    if (!auto) {
      setShowConfirm(true);
      return;
    }

    setSubmitting(true);
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("studentToken") ||
        localStorage.getItem("jwt");

      if (!token) {
        alert("Login expired!");
        navigate("/studentlogin");
        return;
      }

      const payload = {
        answers,
        timeTaken: (Number(test.duration) * 60) - timeLeft,
      };

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await API.post(
        `/api/testattempts/${testId}/submit`,
        payload,
        config
      );

      clearInterval(autosaveTimer.current);
      clearInterval(countdownTimer.current);
      localStorage.removeItem(`testAttempt_${testId}`);

      setSubmittedAttempt(res.data.attempt || res.data);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 2500);
      setStarted(false);
    } catch (err) {
      alert("Submission failed!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="system-message">Loading test...</div>;

  if (pageError)
    return (
      <div className="test-take-container">
        <div className="system-message error">{pageError}</div>
        <button className="btn-save" onClick={() => navigate("/student/tests")}>
          Back
        </button>
      </div>
    );

  if (submittedAttempt) {
    const s = submittedAttempt.totalObtained || 0;
    const t = submittedAttempt.totalMarks || test.totalMarks;

    return (
      <div className="test-take-container">
        <div className="result-box">Your Score: {s}/{t}</div>
        <button className="btn-start" onClick={() => navigate("/student/tests")}>
          Back to Tests
        </button>
      </div>
    );
  }

  return (
    <div className="test-take-container">
      <h1>{test.title}</h1>

      {!started && savedDraft && (
        <div className="system-message saved-info">
          Saved draft found — resume or start fresh.
        </div>
      )}

{!started && (
  <button
    className="btn-start"
    onClick={() => {
      if (savedDraft) setShowResumeModal(true);
      else startTest(false);
    }}
  >
    ▶ Start Test
  </button>
)}


      <div className={`quiz-timer ${timeLeft <= 60 ? "timer-warning" : ""}`}>
        Time Left: {formatTime(timeLeft)}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitFinal(false);
        }}
      >
        <ol>
          {test.questions.map((q, index) => {
            const qId = q._id;
            const selected = answers[qId] || "";

            return (
              <li key={qId}>
                <div className="question-text">
                  {index + 1}. {q.text}
                  <small>
                    Marks: {q.marks} | Topic: {q.topic}
                  </small>
                </div>

                <div className="options-list">
                  {q.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i);

                    return (
                      <label key={i} className="option-card">
                        <input
                          type="radio"
                          name={qId}
                          disabled={!started || submitting}
                          checked={selected === letter}
                          onChange={() => selectOption(qId, letter)}
                        />
                        <span>
                          {letter}. {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="actions">
          <button className="btn-submit" disabled={!started || submitting}>
            Submit Test
          </button>

          <button
            type="button"
            className="btn-save"
            disabled={!started || submitting}
            onClick={() => {
              localStorage.setItem(
                `testAttempt_${testId}`,
                JSON.stringify({ answers, timeLeft })
              );
              setShowSaved(true);
              setTimeout(() => setShowSaved(false), 2000);
            }}
          >
            Save Progress
          </button>
        </div>
      </form>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Submit Test?</h2>
            <p>You cannot change answers after submission.</p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={() => {
                  setShowConfirm(false);
                  submitFinal(true);
                }}
              >
                Yes — Submit
              </button>
            </div>
          </div>
        </div>
      )}

{showResumeModal && (
  <div className="modal-overlay" role="dialog" aria-modal="true">
    <div className="modal-card resume-modal">
      <h2>Resume Saved Attempt?</h2>
      <p>You have an unfinished attempt saved. What would you like to do?</p>

      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => {
            setShowResumeModal(false);
            startTest(false); 
          }}
        >
          Start Fresh
        </button>

        <button
          className="confirm-btn"
          onClick={() => {
            setShowResumeModal(false);
            startTest(true); 
          }}
        >
          Resume Attempt
        </button>
      </div>
    </div>
  </div>
)}

      {showSuccess && <div className="success-popup">Test Submitted Successfully!</div>}
      {showSaved && <div className="saved-popup">Progress Saved!</div>}
    </div>
  );
};

export default TestTake;

