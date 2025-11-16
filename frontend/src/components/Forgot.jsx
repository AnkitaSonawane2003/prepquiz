// import React, { useState } from "react";
// import "../styles/forgot.css";

// export default function Forgot() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     const response = await fetch("http://localhost:5000/api/student/forgot-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage("Reset link has been sent to your email.");
//     } else {
//       setError(data.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Forgot Password</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           {message && <p style={{ color: "green" }}>{message}</p>}
//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <button type="submit">
//             Send Reset Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/forgot.css";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const role = location.pathname.includes("teacher") ? "teacher" : "student";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const endpoint =
      role === "teacher"
        ? "/api/teacher/forgot-password"
        : "/api/student/forgot-password";

    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Reset link generated ,check your email.");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{role === "teacher" ? "Teacher" : "Student"} Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}

