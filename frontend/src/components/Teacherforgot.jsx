import axios from "axios";
import { useState,useEffect } from "react";
import "../styles/teacherforgot.css";
const apiUrl = import.meta.env.VITE_API_URL;
export default function Teacherforgot() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");




  useEffect(() => {
  fetch(`${apiUrl}/api/tests`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}, []);
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/teacher/forgot-password", { email });
      setMsg("Password reset link generated ,check your email.");
      console.log(res.data);
    } catch (err) {
      setMsg(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="teacher-auth-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={submit}>Send Reset Link</button>
      <p className={msg.includes("generated") ? "success" : ""}>{msg}</p>
    </div>
  );
}
