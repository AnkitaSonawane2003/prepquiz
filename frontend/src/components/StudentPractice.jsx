import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/studentPractice.css";

const StudentPractice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState({});
  const [submissions, setSubmissions] = useState({});
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const currentProblemLS = JSON.parse(localStorage.getItem("currentProblem"));

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/problems");
        const data = await res.json();
        if (data.success) setProblems(data.problems || []);
        else setProblems([]);
      } catch (err) {
        console.error("Failed to load problems:", err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    const fetchSolved = async () => {
      try {
        const responses = await Promise.all(
          problems.map((p) =>
            fetch(`http://localhost:5000/api/submissions/${userEmail}/${p._id}`)
          )
        );

        const data = await Promise.all(responses.map((r) => r.json()));
        const solved = {};
        const subs = {};

        data.forEach((d, i) => {
          if (d.success && d.submission) {
            solved[problems[i]._id] = true;
            subs[problems[i]._id] = d.submission;
          }
        });

        setSolvedProblems(solved);
        setSubmissions(subs);
      } catch (err) {
        console.error("Error fetching solved problems:", err);
      }
    };

    if (userEmail && problems.length > 0) fetchSolved();
  }, [problems, userEmail]);

 const handleOpen = (problem) => {
  if (!problem || !problem._id) return;

  const isSolved =
    solvedProblems[problem._id] ||
    (currentProblemLS?.status === "solved" &&
      currentProblemLS._id === problem._id);

  const submission = submissions[problem._id];

if (isSolved && submission) {
  Swal.fire({
    title: `${problem.title} — Solved ✅`,
    html: `
      <div style="text-align:left;">
        <h3><b>Description:</b></h3>
        <p style="background:#fafafa;padding:10px;border-radius:6px;">
          ${problem.description}
        </p>

        <h3><b>Your Solution:</b></h3>
        <pre style="text-align:left;background:#f7f7f7;padding:10px;border-radius:6px;overflow:auto;">
${submission.code}
        </pre>
      </div>
    `,
    width: "65%",
    confirmButtonText: "Close",
  });
}
else {
  
    localStorage.setItem(
      "currentProblem",
      JSON.stringify({ ...problem, status: "open" })
    );

    navigate(`/compiler/${problem._id}`);
  }
};


  return (
    <div className="student-practice-wrapper">
      <div className="student-practice-container">
        <header className="sp-header">
          <h1>💻 Coding Practice</h1>
          <p>
            Browse problems added by your instructor — solve them and view your submissions.
          </p>
        </header>

        {loading ? (
          <div className="sp-loader">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="sp-empty">No problems available yet. Check back later.</div>
        ) : (
          <div className="sp-grid">
            {problems.map((p) => {
              const isSolved =
                solvedProblems[p._id] ||
                (currentProblemLS?.status === "solved" &&
                  currentProblemLS._id === p._id);
              return (
                <article key={p._id} className="sp-card">
                  <div className="sp-card-header">
                    <h2>{p.title}</h2>
                    <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </div>
                  <p className="sp-meta">
                    {p.type} • {p.tags && p.tags.join(", ")}
                  </p>
                  <p className="sp-desc">
                    {p.description.slice(0, 220)}
                    {p.description.length > 220 ? "..." : ""}
                  </p>
                  <div className="sp-footer">
                    <button
                      className={`btn ${isSolved ? "solved" : "view-btn"}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(p);
                      }}
                    >
                      {isSolved ? "✅ Solved" : "Open"}
                    </button>
                    <span className="created">
                      Added {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPractice;



