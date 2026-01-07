import React from 'react';
import '../styles/Features.css'; 
const Features = () => {
  return (
    <div className="features-container">
      <section className="features-header">
        <h1>Platform Features</h1>
        <p>Your all-in-one test preparation toolkit.</p>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>✅ Aptitude Tests</h3>
          <p>
            Master quantitative aptitude, logical reasoning, data interpretation, and verbal ability with
            topic-wise tests.
          </p>
        </div>

        <div className="feature-card">
          <h3>💻 Technical MCQs</h3>
          <p>
            Practice technical multiple-choice questions across C, DBMS, OS, CN, OOPs, and more — ideal for tech interviews.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔥 Coding Challenges</h3>
          <p>
            Sharpen your programming skills with real-world coding challenges and problem-solving exercises in C/C++/Java/Python.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Analytics & Reports</h3>
          <p>
            Get personalized reports, track your performance, identify weak areas, and improve with smart analytics.
          </p>
        </div>

        <div className="feature-card">
          <h3>🕒 Timed Mock Tests</h3>
          <p>
            Simulate real exam conditions with full-length mock tests and timed assessments to build exam stamina.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎓 Placement Preparation</h3>
          <p>
            Tailored resources and practice sets designed specifically for campus placements and job readiness.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Features;
