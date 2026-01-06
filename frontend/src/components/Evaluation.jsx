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
  const [studentName, setStudentName] = useState("");
  const [testAttempts, setTestAttempts] = useState([]); 
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("studentToken");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    async function fetchData() {
      try {
        if (token) {
         
          const profileRes = await fetch(
            "https://prepquiz.onrender.com/api/student/profile",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const profileData = await profileRes.json();
          if (profileData.fullName) setStudentName(profileData.fullName);
          if (userEmail) {
            const evalRes = await fetch(
              `https://prepquiz.onrender.com/api/evaluation/user/${encodeURIComponent(
                userEmail
              )}`
            );
            const evalData = await evalRes.json();
            if (evalData && evalData.email) setData(evalData);
          }
          const attemptsRes = await fetch(
            "https://prepquiz.onrender.com/api/testattempts/my",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const attemptsData = await attemptsRes.json();
          if (attemptsData.success && Array.isArray(attemptsData.attempts)) {
            setTestAttempts(attemptsData.attempts);
          }
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

  return (
    <div className="evaluation-page">
      <h1 className="evaluation-title">💻 Coding Evaluation</h1>

      {data ? (
        <div className="evaluation-content">
      
          <div className="evaluation-card">
            <h2>{studentName || "Unnamed Student"}</h2>
            <p>
              <b>Problems Solved:</b> {data.uniqueProblemsSolved || 0}
            </p>
            <p>
              <b>Total Submissions:</b> {data.totalSubmissions || 0}
            </p>
            <p>
              <b>Score:</b> {data.score || 0}
            </p>
            <p>
              <b>Last Submission:</b>{" "}
              {data.lastSubmissionDate
                ? new Date(data.lastSubmissionDate).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Problems Solved", value: data.uniqueProblemsSolved || 0 },
                  { name: "Submissions", value: data.totalSubmissions || 0 },
                  { name: "Score", value: data.score || 0 },
                ]}
              >
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
      ) : (
        <div className="no-data">No coding evaluation found</div>
      )}
      <h1 className="evaluation-title">📄 Test Evaluation</h1>
      {testAttempts.length === 0 ? (
        <div className="no-data">No test attempts found for this student</div>
      ) : (
        <div className="test-attempts-grid">
          {testAttempts.map((attempt) => {
            const { test, answers = [], totalObtained, totalMarks, timeTaken, createdAt } =
              attempt || {};

        
            const topicMap = {};
            answers.forEach((ans) => {
              const question = test?.questions?.find((q) => q._id === ans.question);
              if (!question) return;
              const topic = question.topic || "General";
              if (!topicMap[topic]) topicMap[topic] = { obtained: 0, total: 0, count: 0 };
              topicMap[topic].obtained += ans.marksObtained || 0;
              topicMap[topic].total += question.marks || 0;
              topicMap[topic].count += 1;
            });

            const topicPerformance = Object.keys(topicMap).map((topic) => ({
              name: topic,
              marksObtained: topicMap[topic].obtained,
              totalMarks: topicMap[topic].total,
              questionCount: topicMap[topic].count,
            }));

            return (
              <div key={attempt._id} className="evaluation-card">
                  <h2>Evaluation for : {studentName || "Unnamed Student"}</h2>
                <h2>{test?.title || "Untitled Test"}</h2>
                <p>
                  <b>Time Taken:</b> {timeTaken || 0} sec
                </p>
                <p>
                  <b>Score:</b> {totalObtained || 0}/{totalMarks || 0}
                </p>
                <p>
                  <b>Submitted At:</b>{" "}
                  {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
                </p>

                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { name: "Score", value: totalObtained || 0 },
                      { name: "Total", value: totalMarks || 0 },
                    ]}
                  >
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

                {topicPerformance.length > 0 ? (
                  <div className="topic-performance">
                    <h3>Topic-wise Marks</h3>
                    <table className="topic-table">
                      <thead>
                        <tr>
                          <th>Topic</th>
                          <th>Questions Count</th> 
                          <th>Marks Obtained</th>
                          <th>Total Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topicPerformance.map((t) => (
                          <tr key={t.name}>
                            <td>{t.name}</td>
                            <td>{t.questionCount}</td> 
                            <td>{t.marksObtained}</td>
                            <td>{t.totalMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-data">Topic-wise details not available</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
