import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const features = [
  {
    title: "✅ Aptitude Tests",
    description: "Quant, Logical Reasoning, Data Interpretation, and Verbal Ability.",
  },
  {
    title: "💻 Technical MCQs",
    description: "Covering C, Operating Systems, DBMS, Computer Networks, and more.",
  },
  {
    title: "🔥 Coding Challenges",
    description: "Hands-on coding practice with real-world problems.",
  },
  {
    title: "📊 Analytics & Reports",
    description: "Track progress, identify weaknesses, and improve strategically.",
  },
];

const Home = () => {
  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero" aria-label="Introduction">
        <div className="hero-content">
          <h1 className="typing-text" aria-live="polite" aria-atomic="true">
            <Typewriter
              words={["Welcome to PrepQuiz"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>

          <h2 className="hero-subtitle">Practice. Analyze. Succeed.</h2>

          <Link to="/selection" aria-label="Navigate to selection page">
            <button className="cta-button">Get Started</button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about" aria-label="About PrepQuiz">
        <h2>About PrepQuiz</h2>
        <p>
          <strong>PrepQuiz</strong> is a smart aptitude and technical assessment platform tailored for students
          preparing for competitive exams and campus placements. We provide an all-in-one solution for practicing
          aptitude, technical MCQs, and coding challenges, with detailed analytics to guide your improvement.
          Whether you're aiming for a job or just improving your skills, PrepQuiz supports your journey with
          targeted practice and performance insights.
        </p>
      </section>

      {/* Features Section */}
      <section className="features" aria-label="Platform Features">
        <h2>✨ Platform Features</h2>
        <div className="feature-grid">
          {features.map((feat, index) => (
            <div className="feature-item" key={index}>
              <h3>{feat.title}</h3>
              <p>{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

 
    </main>
  );
};

export default Home;
