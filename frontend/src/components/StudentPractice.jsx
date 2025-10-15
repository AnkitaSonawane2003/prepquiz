// src/components/StudentPractice.jsx
import React, { useEffect, useState } from "react";
import "../styles/studentPractice.css";

const StudentPractice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="student-practice-wrapper">
      <div className="student-practice-container">
        <header className="sp-header">
          <h1>💻 Coding Practice</h1>
          <p>Browse problems added by your instructor — filter by difficulty & tags.</p>
        </header>

        {loading ? (
          <div className="sp-loader">Loading problems...</div>
        ) : problems.length === 0 ? (
          <div className="sp-empty">No problems available yet. Check back later.</div>
        ) : (
          <div className="sp-grid">
            {problems.map((p) => (
              <article key={p._id} className="sp-card">
                <div className="sp-card-header">
                  <h2>{p.title}</h2>
                  <span className={`tag difficulty ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                </div>
                <p className="sp-meta">{p.type} • {p.tags && p.tags.join(", ")}</p>
                <p className="sp-desc">{p.description.slice(0, 220)}{p.description.length>220?"...":""}</p>
                <div className="sp-footer">
                  <button className="btn view-btn" onClick={() => alert("Open problem: " + p.title)}>Open</button>
                  <span className="created">Added {new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPractice;
