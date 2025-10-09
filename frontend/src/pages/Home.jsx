import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to PrepQuiz</h1>
        <h2>"Practice. Analyze. Succeed."</h2>

        {/* Get Started button navigates to Login/Register */}
        <Link to="/select">
          <button>Get Started</button>
        </Link>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About PrepQuiz</h2>
        <p>
          <strong>PrepQuiz</strong> is a smart aptitude and technical assessment platform tailored for students preparing
          for competitive exams and campus placements. We provide an all-in-one solution for practicing aptitude,
          technical MCQs, and coding challenges, with detailed analytics to guide your improvement. Whether you're
          aiming for a job or just improving your skills, PrepQuiz supports your journey with targeted practice and
          performance insights.
        </p>
      </section>

      {/* Features Section */}
   {/* Features Section */}
<section className="features">
 
  <div className="feature-grid">
    <div className="feature-item">
       <h2>✨ Platform Features</h2>
      <h3>✅ Aptitude Tests</h3>
      <p>Quant, Logical Reasoning, Data Interpretation, and Verbal Ability.</p>

      <h3>💻 Technical MCQs</h3>
      <p>Covering C, Operating Systems, DBMS, Computer Networks, and more.</p>

      <h3>🔥 Coding Challenges</h3>
      <p>Hands-on coding practice with real-world problems.</p>

      <h3>📊 Analytics & Reports</h3>
      <p>Track progress, identify weaknesses, and improve strategically.</p>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;
