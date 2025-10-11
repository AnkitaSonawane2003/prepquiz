import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/RegisterTeacher.css";

export default function RegisterTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  console.log("Submitting data:", formData);

  try {
    const response = await fetch("http://localhost:5000/api/teacher/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (response.ok) {
      alert(data.message || "Teacher registered successfully!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        department: "",
      });
      navigate("/teacherlogin", { replace: true });
    } else {
      setError(data.message || "Registration failed. Please try again.");
    }
  } catch (err) {
    console.error("Registration error:", err);
    setError("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create a Teacher Account</h2>

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
              placeholder="Enter your email/username"
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

          {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/teacherlogin" style={{ color: "blue", cursor: "pointer" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}  