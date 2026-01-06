import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/forgot.css";

export default function ResetPassword() {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const role = location.pathname.includes("teacher") ? "teacher" : "student";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    const endpoint =
      role === "teacher"
        ? `/api/teacher/reset-password/${token}`
        : `/api/student/reset-password/${token}`;

    try {
      const response = await fetch(`https://prepquiz.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => {
          navigate(role === "teacher" ? "/teacherlogin" : "/studentlogin");
        }, 2000);

      } else {
        setError(data.message || "Error resetting password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{role === "teacher" ? "Teacher" : "Student"} Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
