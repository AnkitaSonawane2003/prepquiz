import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify"; // ✅ NEW
import "react-toastify/dist/ReactToastify.css"; // ✅ NEW
import "../styles/RegisterTeacher.css";

export default function RegisterStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rollNumber: "",
    password: "",
    department: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Student registered successfully!"); // ✅ REPLACED alert
        setFormData({
          fullName: "",
          email: "",
          rollNumber: "",
          password: "",
          department: "",
        });

        // Delay redirect to allow time for toast message
        setTimeout(() => {
          navigate("/studentlogin", { replace: true });
        }, 2000);
      } else {
        toast.error(data.message || "Registration failed. Please try again."); // ✅ TOAST for errors
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Server error. Please try again later."); // ✅ TOAST for server errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create a Student Account</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email/Username</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              placeholder="Enter your roll number"
              pattern="[A-Za-z0-9]+"
              title="Roll number must be alphanumeric"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div
              className="password-wrapper"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ flex: 1 }}
                autoComplete="new-password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="eye-icon"
                style={{ cursor: "pointer", marginLeft: "8px" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") togglePasswordVisibility();
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
              <option value="EEE">Electrical</option>
            </select>
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/studentlogin" style={{ color: "blue", cursor: "pointer" }}>
            Login
          </Link>
        </p>
      </div>

      {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
