// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "../styles/Login.css";

// export default function StudentLogin() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       // ✅ Student route (not teacher)
//       const url = "http://localhost:5000/api/student/login";

//       const payload = {
//         email: formData.email.toLowerCase(),
//         password: formData.password,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("studentToken", data.token);
//         setError(null);
//         navigate("/studentpage"); // redirect to student dashboard
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Student Login</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               autoComplete="username"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div
//               className="password-wrapper"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 style={{ flex: 1 }}
//                 autoComplete="current-password"
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="eye-icon"
//                 style={{ cursor: "pointer", marginLeft: "8px" }}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ")
//                     togglePasswordVisibility();
//                 }}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </span>
//             </div>
//           </div>

//           {error && (
//             <p className="error-message" style={{ color: "red" }}>
//               {error}
//             </p>
//           )}

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/regstud" style={{ color: "blue", cursor: "pointer" }}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import "../styles/Login.css";

// export default function StudentLogin() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const url = "http://localhost:5000/api/student/login"; // ✅ correct student route

//       const payload = {
//         email: formData.email.toLowerCase(),
//         password: formData.password,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("studentToken", data.token);
//         localStorage.setItem("userRole", "student");
//         window.dispatchEvent(new Event("login")); // trigger navbar update
//         navigate("/studentpage"); // or your actual dashboard route
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Student Login</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               autoComplete="username"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div
//               className="password-wrapper"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 style={{ flex: 1 }}
//                 autoComplete="current-password"
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="eye-icon"
//                 style={{ cursor: "pointer", marginLeft: "8px" }}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     togglePasswordVisibility();
//                   }
//                 }}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </span>
//             </div>
//           </div>

//           {error && (
//             <p className="error-message" style={{ color: "red" }}>
//               {error}
//             </p>
//           )}

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/regstud" style={{ color: "blue", cursor: "pointer" }}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import "../styles/Login.css";

// export default function StudentLogin() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       // ✅ Student route (not teacher)
//       const url = "http://localhost:5000/api/student/login";

//       const payload = {
//         email: formData.email.toLowerCase(),
//         password: formData.password,
//       };

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("studentToken", data.token);
//         setError(null);
//         navigate("/studentpage"); // redirect to student dashboard
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Student Login</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               autoComplete="username"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div
//               className="password-wrapper"
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your password"
//                 style={{ flex: 1 }}
//                 autoComplete="current-password"
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="eye-icon"
//                 style={{ cursor: "pointer", marginLeft: "8px" }}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ")
//                     togglePasswordVisibility();
//                 }}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </span>
//             </div>
//           </div>

//           {error && (
//             <p className="error-message" style={{ color: "red" }}>
//               {error}
//             </p>
//           )}

//           <button type="submit" className="login-btn" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/regstud" style={{ color: "blue", cursor: "pointer" }}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../styles/Login.css";

export default function StudentLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const navigate = useNavigate();
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
      // ✅ Student route (not teacher)
      const url = "http://localhost:5000/api/student/login";

      const payload = {
        email: formData.email.toLowerCase(),
        password: formData.password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("studentToken", data.token);
        setError(null);
        navigate("/studentpage"); // redirect to student dashboard
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Student Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div
              className="password-wrapper"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                style={{ flex: 1 }}
                autoComplete="current-password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="eye-icon"
                style={{ cursor: "pointer", marginLeft: "8px" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    togglePasswordVisibility();
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>

          {error && (
            <p className="error-message" style={{ color: "red" }}>
              {error}
            </p>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don’t have an account?{" "}
          <Link to="/regstud" style={{ color: "blue", cursor: "pointer" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}