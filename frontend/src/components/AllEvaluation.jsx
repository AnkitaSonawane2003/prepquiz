// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [evaluations, setEvaluations] = useState([]);

//   useEffect(() => {
//     const fetchEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
//         setEvaluations(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEvaluations();
//   }, []);

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Coding Evaluation</h1>

//       {/* --- Overall Stats --- */}
//       <div className="overall-stats">
//         <div className="stat-card">
//           <h3>Total <br />Students</h3>
//           <p>{evaluations.length}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total <br />Submissions<br /></h3>
//           <p>{evaluations.reduce((acc, e) => acc + e.totalSubmissions, 0)}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Average Submissions/<br />Student</h3>
//           <p>
//             {evaluations.length
//               ? (
//                   evaluations.reduce((acc, e) => acc + e.totalSubmissions, 0) /
//                   evaluations.length
//                 ).toFixed(1)
//               : 0}
//           </p>
//         </div>
//       </div>

//       {/* --- Student List --- */}
//       <div className="student-list">
//         {evaluations.map((user) => (
//           <div key={user._id} className="student-card">
//             <h3>{user._id}</h3>
//             <p>
//               🧮 Submissions: <strong>{user.totalSubmissions}</strong>
//             </p>
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
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [codingEvaluations, setCodingEvaluations] = useState([]);
//   const [testEvaluations, setTestEvaluations] = useState([]);

//   // Fetch Coding Evaluations
//   useEffect(() => {
//     const fetchCodingEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
//         setCodingEvaluations(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchCodingEvaluations();
//   }, []);

//   // Fetch Test Evaluations
//   useEffect(() => {
//   const fetchTestEvaluations = async () => {
//     try {
//       const token = localStorage.getItem("studentToken"); // get your token

//       const res = await axios.get(
//         "http://localhost:5000/api/testAttempts/per-student",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // include token
//           },
//         }
//       );

//       setTestEvaluations(res.data.attempts); // store the data
//     } catch (err) {
//       console.error("Test Evaluation Fetch Error:", err);
//     }
//   };

//   fetchTestEvaluations();
// }, []);


//   const renderStats = (data) => ({
//     totalStudents: data.length,
//     totalSubmissions: data.reduce((acc, e) => acc + e.totalSubmissions, 0),
//     avgSubmissions: data.length ? (data.reduce((acc, e) => acc + e.totalSubmissions, 0) / data.length).toFixed(1) : 0,
//   });

//   const codingStats = renderStats(codingEvaluations);
//   const testStats = renderStats(testEvaluations);

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

//       {/* --- Coding Evaluation Stats --- */}
//       <h2>Coding Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card">
//           <h3>Total Students</h3>
//           <p>{codingStats.totalStudents}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Submissions</h3>
//           <p>{codingStats.totalSubmissions}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Average Submissions / Student</h3>
//           <p>{codingStats.avgSubmissions}</p>
//         </div>
//       </div>

//       <div className="student-list">
//         {codingEvaluations.map((user) => (
//           <div key={user._id} className="student-card">
//             <p>📧 {user.email}</p>
//             <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
//             <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* --- Test Evaluation Stats --- */}
//       <h2>Test Evaluation</h2>
//       <div className="overall-stats">
//         <div className="stat-card">
//           <h3>Total Students</h3>
//           <p>{testStats.totalStudents}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Submissions</h3>
//           <p>{testStats.totalSubmissions}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Average Submissions / Student</h3>
//           <p>{testStats.avgSubmissions}</p>
//         </div>
//       </div>

//       <div className="student-list">
//         {testEvaluations.map((user, idx) => (
//           <div key={idx} className="student-card">
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/allevaluate.css";

const AllEvaluations = () => {
  const [codingEvaluations, setCodingEvaluations] = useState([]);
  const [testEvaluations, setTestEvaluations] = useState([]);

  // Fetch Coding Evaluations
  useEffect(() => {
    const fetchCodingEvaluations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/evaluation/all-evaluations"
        );
        setCodingEvaluations(res.data);
      } catch (err) {
        console.error("Coding Evaluation Fetch Error:", err);
      }
    };
    fetchCodingEvaluations();
  }, []);

  // Fetch Test Evaluations
useEffect(() => {
  const fetchTestEvaluations = async () => {
    try {
      const token = localStorage.getItem("token"); // or wherever your auth token is stored
      const res = await axios.get(
        "http://localhost:5000/api/testAttempts/per-student",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTestEvaluations(res.data.attempts);
    } catch (err) {
      console.error("Test Evaluation Fetch Error:", err.response || err);
    }
  };
  fetchTestEvaluations();
}, []);


  const renderStats = (data) => ({
    totalStudents: data.length,
    totalSubmissions: data.reduce((acc, e) => acc + e.totalSubmissions, 0),
    avgSubmissions: data.length
      ? (data.reduce((acc, e) => acc + e.totalSubmissions, 0) / data.length).toFixed(1)
      : 0,
  });

  const codingStats = renderStats(codingEvaluations);
  const testStats = renderStats(testEvaluations);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Overall Student Evaluations</h1>

      {/* --- Coding Evaluation --- */}
      <h2>Coding Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{codingStats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p>{codingStats.totalSubmissions}</p>
        </div>
        <div className="stat-card">
          <h3>Average Submissions / Student</h3>
          <p>{codingStats.avgSubmissions}</p>
        </div>
      </div>
      <div className="student-list">
        {codingEvaluations.map((user) => (
          <div key={user.email} className="student-card">
            <p>📧 {user.email}</p>
            <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
            <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* --- Test Evaluation --- */}
      <h2>Test Evaluation</h2>
      <div className="overall-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{testStats.totalStudents}</p>
        </div>
        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p>{testStats.totalSubmissions}</p>
        </div>
        <div className="stat-card">
          <h3>Average Submissions / Student</h3>
          <p>{testStats.avgSubmissions}</p>
        </div>
      </div>
      <div className="student-list">
        {testEvaluations.map((user) => (
          <div key={user.email} className="student-card">
            <p>📧 {user.email}</p>
            <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
            <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;
