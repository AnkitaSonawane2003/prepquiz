// import React, { useEffect, useState } from "react";
// import {
//   BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from "recharts";
// import "../styles/evaluation.css";

// export default function UserEvaluation() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     if (userEmail) {
//       fetch(`http://localhost:5000/api/evaluation/user/${encodeURIComponent(userEmail)}`)
//         .then((res) => res.json())
//         .then((resData) => {
//           if (resData && resData.email) setData(resData);
//         })
//         .catch((err) => console.error("Error fetching evaluation:", err))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [userEmail]);

//   if (loading) return <div className="loading">Loading evaluation...</div>;
//   if (!data) return <div className="no-data">No evaluation found for this user</div>;

//   const chartData = [
//     { name: "Problems Solved", value: data.uniqueProblemsSolved },
//     { name: "Submissions", value: data.totalSubmissions },
//     { name: "Score", value: data.score }
//   ];

//   return (
//     <div className="evaluation-page">
//       <h1 className="evaluation-title">💻 Coding Evaluation</h1>

//       <div className="evaluation-content">
//         {/* Left Side: Stats Card */}
//         <div className="evaluation-card">
//           <h2>{data.email}</h2>
//           <p><b>Problems Solved:</b> {data.uniqueProblemsSolved}</p>
//           <p><b>Total Submissions:</b> {data.totalSubmissions}</p>
//           <p><b>Score:</b> {data.score}</p>
//           <p><b>Last Submission:</b> {new Date(data.lastSubmissionDate).toLocaleString()}</p>
//         </div>

//         {/* Right Side: Chart */}
//         <div className="chart-container">
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" fill="#007BFF" barSize={50} radius={[10, 10, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/evaluation.css";

export default function UserEvaluation() {
  const [data, setData] = useState(null);
  const [studentName, setStudentName] = useState(""); // store name here
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("studentToken");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: Fetch student profile to get the name
        if (token) {
          const profileRes = await fetch("http://localhost:5000/api/student/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const profileData = await profileRes.json();
          if (profileData.fullName) setStudentName(profileData.fullName);
        }

        // Step 2: Fetch evaluation data
        if (userEmail) {
          const evalRes = await fetch(
            `http://localhost:5000/api/evaluation/user/${encodeURIComponent(userEmail)}`
          );
          const evalData = await evalRes.json();
          if (evalData && evalData.email) setData(evalData);
        }
      } catch (err) {
        console.error("Error fetching evaluation:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, userEmail]);

  if (loading) return <div className="loading">Loading evaluation...</div>;
  if (!data) return <div className="no-data">No evaluation found for this user</div>;

  const chartData = [
    { name: "Problems Solved", value: data.uniqueProblemsSolved },
    { name: "Submissions", value: data.totalSubmissions },
    { name: "Score", value: data.score },
  ];

  return (
    <div className="evaluation-page">
      <h1 className="evaluation-title">💻 Coding Evaluation</h1>

      <div className="evaluation-content">
        {/* Left Side: Stats Card */}
        <div className="evaluation-card">
          <h2>{studentName || "Unnamed Student"}</h2> {/* ✅ Student Name here */}
          <p><b>Problems Solved:</b> {data.uniqueProblemsSolved}</p>
          <p><b>Total Submissions:</b> {data.totalSubmissions}</p>
          <p><b>Score:</b> {data.score}</p>
          <p>
            <b>Last Submission:</b>{" "}
            {new Date(data.lastSubmissionDate).toLocaleString()}
          </p>
        </div>

        {/* Right Side: Chart */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#007BFF"
                barSize={50}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
