import React from 'react';
import '../styles/About.css'; 
const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 className="about-title">About PrepQuiz</h1>
        <p className="about-subtitle">Empowering students to practice, analyze, and succeed.</p>
      </section>

      <section className="about-content">
        <h2>🚀 Our Mission</h2>
        <p>
          PrepQuiz is designed to help students master aptitude, technical concepts, and coding skills through
          structured practice and detailed performance analytics. Whether you're preparing for campus placements,
          competitive exams, or just want to sharpen your skills — PrepQuiz has you covered.
        </p>

        <h2>🎯 Why Choose PrepQuiz?</h2>
        <ul>
          <li><strong>All-in-One Platform:</strong> Practice Aptitude, Technical MCQs, and Coding Challenges in one place.</li>
          <li><strong>Personalized Analytics:</strong> Track your progress, identify weak areas, and improve efficiently.</li>
          <li><strong>Job-Ready Preparation:</strong> Simulate real assessment environments to boost your confidence.</li>
          <li><strong>Up-to-date Content:</strong> Regularly updated questions and challenges aligned with industry standards.</li>
        </ul>

        <h2>👨‍🎓 Who Is It For?</h2>
        <p>
          PrepQuiz is built for college students, freshers, and self-learners who are serious about cracking aptitude
          tests, technical interviews, and coding rounds at top companies.
        </p>

        <h2>📈 Our Vision</h2>
        <p>
          To become the go-to platform for test-based technical learning and skill development for students across India
          and beyond. We believe in learning by doing — and doing it smartly.
        </p>
      </section>
    </div>
  );
};

export default About;
