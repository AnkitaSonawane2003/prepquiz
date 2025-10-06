import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterTeacher.css";

export default function RegisterTeacher() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
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

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "blue", cursor: "pointer" }}>
            Login
          </Link>
        </p>

        <p>
          Are you a student?{" "}
          <Link to="/register" style={{ color: "blue", cursor: "pointer" }}>
            Register as Student
          </Link>
        </p>
      </div>
    </div>
  );
}
