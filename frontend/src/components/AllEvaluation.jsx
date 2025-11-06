import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/allevaluate.css";

const AllEvaluations = () => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
        setEvaluations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvaluations();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">📊 Overall Student Coding Evaluation</h1>

      {/* --- Overall Stats --- */}
      <div className="overall-stats">
        <div className="stat-card">
          <h3>Total <br />Students</h3>
          <p>{evaluations.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total <br />Submissions<br /></h3>
          <p>{evaluations.reduce((acc, e) => acc + e.totalSubmissions, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Submissions/<br />Student</h3>
          <p>
            {evaluations.length
              ? (
                  evaluations.reduce((acc, e) => acc + e.totalSubmissions, 0) /
                  evaluations.length
                ).toFixed(1)
              : 0}
          </p>
        </div>
      </div>

      {/* --- Student List --- */}
      <div className="student-list">
        {evaluations.map((user) => (
          <div key={user._id} className="student-card">
            <h3>{user._id}</h3>
            <p>
              🧮 Submissions: <strong>{user.totalSubmissions}</strong>
            </p>
            <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvaluations;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/allevaluate.css";

// const AllEvaluations = () => {
//   const [evaluations, setEvaluations] = useState([]);
//   const [studentNames, setStudentNames] = useState({});
//   const [selectedEval, setSelectedEval] = useState(null);

//   useEffect(() => {
//     const fetchEvaluations = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/evaluation/all-evaluations");
//         const allEvals = res.data || [];
//         setEvaluations(allEvals);

//         // Fetch student names using their email (_id)
//         const names = {};
//         await Promise.all(
//           allEvals.map(async (e) => {
//             try {
//               const studentRes = await axios.get(
//                 `http://localhost:5000/api/student/profile-by-email/${encodeURIComponent(e._id)}`
//               );
//               names[e._id] = studentRes.data.fullName || "Unnamed Student";
//             } catch {
//               names[e._id] = "Unnamed Student";
//             }
//           })
//         );
//         setStudentNames(names);
//       } catch (err) {
//         console.error("Error fetching evaluations:", err);
//       }
//     };

//     fetchEvaluations();
//   }, []);

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">📊 Overall Student Evaluation Dashboard</h1>

//       {/* --- Overall Stats --- */}
//       <div className="overall-stats">
//         <div className="stat-card">
//           <h3>Total Students</h3>
//           <p>{evaluations.length}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Total Submissions</h3>
//           <p>{evaluations.reduce((acc, e) => acc + e.totalSubmissions, 0)}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Average Submissions/Student</h3>
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

//       {/* --- Student Cards --- */}
//       <div className="student-list">
//         {evaluations.map((user) => (
//           <div
//             key={user._id}
//             className="student-card"
//             onClick={() => setSelectedEval(user)}
//           >
//             <h3>{studentNames[user._id] || "Loading..."}</h3>
//             <p>📧 {user._id}</p>
//             <p>🧮 Submissions: <strong>{user.totalSubmissions}</strong></p>
//             <p>🕒 Last: {new Date(user.lastSubmission).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       {/* --- Popup Modal --- */}
//       {selectedEval && (
//         <div className="modal-overlay" onClick={() => setSelectedEval(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={() => setSelectedEval(null)}>
//               ✖
//             </button>

//             <h2>{studentNames[selectedEval._id] || "Unnamed Student"}</h2>
//             <p><b>Email:</b> {selectedEval._id}</p>
//             <p><b>Problems Solved:</b> {selectedEval.uniqueProblemsSolved || 0}</p>
//             <p><b>Total Submissions:</b> {selectedEval.totalSubmissions}</p>
//             <p><b>Score:</b> {selectedEval.score || 0}</p>
//             <p><b>Last Submission:</b> {new Date(selectedEval.lastSubmission).toLocaleString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllEvaluations;
