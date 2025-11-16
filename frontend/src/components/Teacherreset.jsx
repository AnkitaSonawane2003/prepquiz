// src/components/Teacherreset.jsx
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/teacherforgot.css";

export default function Teacherreset() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/teacher/reset-password/${token}`, {
        password,
      });
      setMsg(res.data.message || "Password reset successful");
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="teacher-auth-container">
      <h2>Reset Password</h2>
      <div className="password-wrapper" style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#0d9488",
          }}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>
      <button onClick={submit}>Update Password</button>
      <p className={msg.includes("successful") ? "success" : ""}>{msg}</p>
    </div>
  );
}
