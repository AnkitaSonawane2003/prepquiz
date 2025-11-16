// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [codingEvaluations, setCodingEvaluations] = useState([]);
//   const [testEvaluations, setTestEvaluations] = useState([]);
//   const navigate = useNavigate();

//   // Fetch Coding Evaluations (public)
//   useEffect(() => {
//     const fetchCodingEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
//         setCodingEvaluations(res.data || []);
//       } catch (err) {
//         console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
//       }
//     };
//     fetchCodingEvaluations();
//   }, []);

//   // Fetch Test Evaluations (protected)
//   useEffect(() => {
//     const fetchTestEvaluations = async () => {
//       try {
//         // check multiple keys for compatibility
//         const token = localStorage.getItem("token") || localStorage.getItem("teacherToken") || null;
//         if (!token) {
//           console.warn("No token found in localStorage. Redirecting to login.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login"); // change to your login route if different
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const attempts = res.data?.attempts ?? res.data ?? [];
//         setTestEvaluations(Array.isArray(attempts) ? attempts : []);
//       } catch (err) {
//         console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
//         if (err.response?.status === 401) {
//           // token invalid or expired
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//         }
//       }
//     };
//     fetchTestEvaluations();
//   }, [navigate]);

//   const renderStats = (data) => ({
//     totalStudents: data.length,
//     totalSubmissions: data.reduce((acc, e) => acc + (e.totalSubmissions || 0), 0),
//     avgSubmissions: data.length ? (data.reduce((acc, e) => acc + (e.totalSubmissions || 0), 0) / data.length).toFixed(1) : 0,
//   });

//   const codingStats = renderStats(codingEvaluations);
//   const testStats = renderStats(testEvaluations);

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

//       {/* --- Coding Evaluation --- */}
//       <h2>Coding Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {codingEvaluations.map((user) => (
//           <div key={user.email} className="student-card">
//             <p>📧 {user.email}</p>
//             <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
//             <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* --- Test Evaluation --- */}
//       <h2>Test Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{testStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {testEvaluations.map((user) => (
//           <div key={user.email} className="student-card">
//             <p>📧 {user.email}</p>
//             <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
//             <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllEvaluations;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [codingEvaluations, setCodingEvaluations] = useState([]);
//   const [testEvaluations, setTestEvaluations] = useState([]);
  
//   const navigate = useNavigate();

//   // Fetch coding evaluations
//   useEffect(() => {
//     const fetchCodingEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/submissions/all-evaluations");
//         setCodingEvaluations(res.data || []);
//       } catch (err) {
//         console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
//       }
//     };
//     fetchCodingEvaluations();
//   }, []);

//   // Fetch test evaluations
//   useEffect(() => {
//     const fetchTestEvaluations = async () => {
//       try {
//         const token = localStorage.getItem("token") || localStorage.getItem("teacherToken");
//         if (!token) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const attempts = res.data?.attempts ?? [];
//         setTestEvaluations(Array.isArray(attempts) ? attempts : []);
//       } catch (err) {
//         console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//         }
//       }
//     };
//     fetchTestEvaluations();
//   }, [navigate]);

//   const renderStats = (data, type) => ({
//     totalStudents: data.length,
//     totalSubmissions: data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.marksObtained || 0), 0),
//     avgSubmissions: data.length
//       ? (data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.marksObtained || 0), 0) / data.length).toFixed(1)
//       : 0,
//   });

//   const codingStats = renderStats(codingEvaluations, "coding");
//   const testStats = renderStats(testEvaluations, "test");

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

//       {/* --- Coding Evaluation --- */}
//       <h2>Coding Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {codingEvaluations.map((evalItem, index) => (
//           <div key={index} className="student-card">
//             {evalItem.problemName && <p>📌 Problem: <strong>{evalItem.problemName}</strong></p>}
//             <p>📧 Student: {evalItem.email}</p>
//             <p>🧮 Submissions: <strong>{evalItem.totalSubmissions}</strong></p>
//             {evalItem.lastSubmission && <p>🕒 Last Submission: {new Date(evalItem.lastSubmission).toLocaleString()}</p>}
//           </div>
//         ))}
//       </div>

//       {/* --- Test Evaluation --- */}
//       <h2>Test Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Marks</h3><p>{testStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Marks / Student</h3><p>{testStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {testEvaluations.map((attempt, index) => (
//   <div key={index} className="student-card">
//     {attempt.testName && <p>📌 Test: <strong>{attempt.testName}</strong></p>}
//     <p>📧 Student: {attempt.email}</p>
//     {attempt.marksObtained != null && <p>🏆 Marks Obtained: <strong>{attempt.marksObtained}</strong></p>}
//     {attempt.attemptedOn && <p>🕒 Attempted On: {new Date(attempt.attemptedOn).toLocaleString()}</p>}
//   </div>
// ))}
//       </div>
//     </div>
//   );
// };

// export default AllEvaluations;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [codingEvaluations, setCodingEvaluations] = useState([]);
//   const [testEvaluations, setTestEvaluations] = useState([]);
//   const navigate = useNavigate();

//   // Fetch coding evaluations
//   useEffect(() => {
//     const fetchCodingEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/submissions/all-evaluations");
//         setCodingEvaluations(res.data || []);
//       } catch (err) {
//         console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
//       }
//     };
//     fetchCodingEvaluations();
//   }, []);

//   // Fetch test evaluations
//   useEffect(() => {
//     const fetchTestEvaluations = async () => {
//       try {
//         const token = localStorage.getItem("token") || localStorage.getItem("teacherToken");
//         if (!token) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const attempts = res.data?.attempts ?? [];
//         setTestEvaluations(Array.isArray(attempts) ? attempts : []);
//       } catch (err) {
//         console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//         }
//       }
//     };
//     fetchTestEvaluations();
//   }, [navigate]);

//   // Stats calculation
//   const renderStats = (data, type) => ({
//     totalStudents: new Set(data.map(d => d.email)).size,
//     totalSubmissions: data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.totalSubmissions || 0), 0),
//     avgSubmissions: data.length
//       ? (data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.totalSubmissions || 0), 0) / data.length).toFixed(1)
//       : 0,
//   });

//   const codingStats = renderStats(codingEvaluations, "coding");
//   const testStats = renderStats(testEvaluations, "test");

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

//       {/* --- Coding Evaluation --- */}
//       <h2>Coding Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {codingEvaluations.map((evalItem, index) => (
//           <div key={index} className="student-card">
//             {evalItem.problemName && <p>📌 Problem: <strong>{evalItem.problemName}</strong></p>}
//             <p>📧 Student: {evalItem.email}</p>
//             <p>🧮 Submissions: <strong>{evalItem.totalSubmissions}</strong></p>
//             {evalItem.lastSubmission && <p>🕒 Last Submission: {new Date(evalItem.lastSubmission).toLocaleString()}</p>}
//           </div>
//         ))}
//       </div>

//       {/* --- Test Evaluation --- */}
//     {/* --- Test Evaluation --- */}
// <h2>Test Evaluation</h2>
// <div className="overall-stats">
//   <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
//   <div className="stat-card"><h3>Total Sibmissions</h3><p>{testStats.totalSubmissions}</p></div>
//   <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
// </div>
// <div className="student-list">
//   {testEvaluations.map((attempt) => (
//     <div key={attempt._id} className="student-card">  
//      <p>👤 Name: {attempt.fullName}</p> 
//       <p>📧 Student: {attempt.email}</p>
//       <p>🧮 Submissions: <strong>{attempt.totalSubmissions}</strong></p>
//             <p>🕒 Last: {new Date(attempt.lastSubmission).toLocaleString()}</p>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default AllEvaluations;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/allevaluate.css";

const AllEvaluations = () => {
  const [codingEvaluations, setCodingEvaluations] = useState([]);
  const [testEvaluations, setTestEvaluations] = useState([]);
  const navigate = useNavigate();

  // Fetch coding evaluations
  useEffect(() => {
    const fetchCodingEvaluations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/submissions/all-evaluations");
        const data = res.data || [];

        // Group by student email
        const grouped = {};
        data.forEach(item => {
          if (!grouped[item.email]) {
            grouped[item.email] = {
              email: item.email,
              fullName: item.fullName,
              totalSubmissions: 0,
              lastSubmission: null,
              submissions: [], // store {problemName, lastSubmission}
            };
          }
          grouped[item.email].totalSubmissions += item.totalSubmissions;

          // Add problem with last submission date
          grouped[item.email].submissions.push({
            problemName: item.problemName,
            lastSubmission: item.lastSubmission ? new Date(item.lastSubmission) : null,
          });

          // Track the latest overall submission
          const itemLast = new Date(item.lastSubmission);
          if (!grouped[item.email].lastSubmission || itemLast > grouped[item.email].lastSubmission) {
            grouped[item.email].lastSubmission = itemLast;
          }
        });

        setCodingEvaluations(Object.values(grouped));
      } catch (err) {
        console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
      }
    };
    fetchCodingEvaluations();
  }, []);

  // Fetch test evaluations
  useEffect(() => {
    const fetchTestEvaluations = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("teacherToken");
        if (!token) {
          localStorage.removeItem("token");
          localStorage.removeItem("teacherToken");
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const attempts = res.data?.attempts ?? [];
        setTestEvaluations(Array.isArray(attempts) ? attempts : []);
      } catch (err) {
        console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("teacherToken");
          navigate("/login");
        }
      }
    };
    fetchTestEvaluations();
  }, [navigate]);

  // Stats calculation
  const renderStats = (data) => ({
    totalStudents: data.length,
    totalSubmissions: data.reduce((acc, e) => acc + e.totalSubmissions, 0),
    avgSubmissions: data.length
      ? (data.reduce((acc, e) => acc + e.totalSubmissions, 0) / data.length).toFixed(1)
      : 0,
  });

  const codingStats = renderStats(codingEvaluations);
  const testStats = renderStats(testEvaluations);

  // Format date/time consistently
  const formatDateTime = (date) => {
    return date
      ? new Date(date).toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      : "-";
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

      {/* --- Coding Evaluation --- */}
      <h2>Coding Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {codingEvaluations.map((student, index) => (
          <div key={index} className="student-card">
            <p>👤 Student: <strong>{student.fullName}</strong></p>
            <p>📧 Email: {student.email}</p>
            <p>🧮 Total Submissions: <strong>{student.totalSubmissions}</strong></p>
            {student.lastSubmission && (
              <p>🕒 Last Submission: {formatDateTime(student.lastSubmission)}</p>
            )}

            {/* --- Display individual problems with submission time --- */}
            <div className="attempts-list">
              {student.submissions.map((problem, idx) => (
                <p key={idx}>
                  📌 Problem: <strong>{problem.problemName}</strong> | 🕒 Last Submission: {formatDateTime(problem.lastSubmission)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- Test Evaluation --- */}
      <h2>Test Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
        <div className="stat-card"><h3>Total Submissions</h3><p>{testStats.totalSubmissions}</p></div>
        <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
      </div>
      <div className="student-list">
        {testEvaluations.map((student) => (
          <div key={student._id} className="student-card">
            <p>👤 Name: <strong>{student.fullName}</strong></p>
            <p>📧 Student: {student.email}</p>
            <p>🧮 Total Submissions: <strong>{student.totalSubmissions}</strong></p>
            {student.lastSubmission && (
              <p>🕒 Last Submission: {formatDateTime(student.lastSubmission)}</p>
            )}

            {/* --- Display all test attempts --- */}
            <div className="attempts-list">
              {student.attempts?.map((attempt, idx) => (
                <div key={idx} className="attempt-card">
                  <p>📝 Test: <strong>{attempt.testName}</strong> ({attempt.type})</p>
                  <p>🧮 Marks: {attempt.totalObtained} / {attempt.totalMarks}</p>
                  {attempt.date && <p>📅 Date: {formatDateTime(attempt.date)}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [codingEvaluations, setCodingEvaluations] = useState([]);
//   const [testEvaluations, setTestEvaluations] = useState([]);
//   const navigate = useNavigate();

//   // Fetch coding evaluations
//   useEffect(() => {
//     const fetchCodingEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/submissions/all-evaluations");
//         setCodingEvaluations(res.data || []);
//       } catch (err) {
//         console.error("Coding Evaluation Fetch Error:", err.response?.data || err.message || err);
//       }
//     };
//     fetchCodingEvaluations();
//   }, []);

//   // Fetch test evaluations
//   useEffect(() => {
//     const fetchTestEvaluations = async () => {
//       try {
//         const token = localStorage.getItem("token") || localStorage.getItem("teacherToken");
//         if (!token) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/testAttempts/per-student", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const attempts = res.data?.attempts ?? [];
//         setTestEvaluations(Array.isArray(attempts) ? attempts : []);
//       } catch (err) {
//         console.error("Test Evaluation Fetch Error:", err.response?.data || err.message || err);
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("teacherToken");
//           navigate("/login");
//         }
//       }
//     };
//     fetchTestEvaluations();
//   }, [navigate]);

//   // Stats calculation
//   const renderStats = (data, type) => ({
//     totalStudents: new Set(data.map(d => d.email)).size,
//     totalSubmissions: data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.totalSubmissions || 0), 0),
//     avgSubmissions: data.length
//       ? (data.reduce((acc, e) => acc + (type === "coding" ? e.totalSubmissions : e.totalSubmissions || 0), 0) / data.length).toFixed(1)
//       : 0,
//   });

//   const codingStats = renderStats(codingEvaluations, "coding");
//   const testStats = renderStats(testEvaluations, "test");

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

//       {/* --- Coding Evaluation --- */}
//       <h2>Coding Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{codingStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{codingStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{codingStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {codingEvaluations.map((evalItem, index) => (
//           <div key={index} className="student-card">
//             {evalItem.problemName && <p>📌 Problem: <strong>{evalItem.problemName}</strong></p>}
//            <p>👤 Student:<strong>{evalItem.fullName}</strong> </p>

//             <p>📧 Email: {evalItem.email}</p>
//             <p>🧮 Submissions: <strong>{evalItem.totalSubmissions}</strong></p>
//             {evalItem.lastSubmission && <p>🕒 Last Submission: {new Date(evalItem.lastSubmission).toLocaleString()}</p>}
//           </div>
//         ))}
//       </div>

//       {/* --- Test Evaluation --- */}
//       <h2>Test Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card"><h3>Total Students</h3><p>{testStats.totalStudents}</p></div>
//         <div className="stat-card"><h3>Total Submissions</h3><p>{testStats.totalSubmissions}</p></div>
//         <div className="stat-card"><h3>Average Submissions / Student</h3><p>{testStats.avgSubmissions}</p></div>
//       </div>
//       <div className="student-list">
//         {testEvaluations.map((student) => (
//           <div key={student._id} className="student-card">
//             <p>👤 Name: <strong>{student.fullName}</strong></p>
//             <p>📧 Student: {student.email}</p>
//             <p>🧮 Total Submissions: <strong>{student.totalSubmissions}</strong></p>
//             {student.lastSubmission && <p>🕒 Last Submission: {new Date(student.lastSubmission).toLocaleString()}</p>}

//             {/* --- Display all test attempts --- */}
//             <div className="attempts-list">
//               {student.attempts?.map((attempt, idx) => (
//                 <div key={idx} className="attempt-card">
//                   <p>📝 Test: <strong>{attempt.testName}</strong> ({attempt.type})</p>
//                   <p>🧮 Marks: {attempt.totalObtained} / {attempt.totalMarks}</p>
//                   {attempt.date && <p>📅 Date: {new Date(attempt.date).toLocaleDateString()}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllEvaluations;
