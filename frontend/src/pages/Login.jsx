// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// import "../styles/Login.css";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

// const [showPassword, setShowPassword] = useState(false);
// const togglePasswordVisibility = () => {
//   setShowPassword((prev) => !prev);
// };



//   const navigate = useNavigate(); // for redirection
//   const [error, setError] = useState(null);



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         setError(null);
//         navigate("/admin"); // ✅ Redirect to AdminPage
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Admin Login</h2>
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//        <div className="password-wrapper">
//   <input
//     type={showPassword ? "text" : "password"}
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     required
//     placeholder="Enter your password"
//   />
//   <span
//     onClick={togglePasswordVisibility}
//     className="eye-icon"
//     style={{ cursor: "pointer", marginLeft: "-30px" }}
//   >
//     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//   </span>
// </div>


//           </div>

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/register" style={{ color: "blue", cursor: "pointer" }}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import "../styles/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate(); // for redirection
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setError(null);
        navigate("/admin"); // Redirect to Admin page on successful login
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
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
            <label>Password</label>
            <div className="password-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ flex: 1 }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="eye-icon"
                style={{ cursor: "pointer", marginLeft: "8px" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "blue", cursor: "pointer" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
