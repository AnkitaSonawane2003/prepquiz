import React from 'react';
import "../styles/All.css"; 

function Faq() {
  return (
    <div className="faq-page">
      <section className="faq-section">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-item">
          <h3>Q: How do I register for PrepQuiz?</h3>
          <p>A: Click on the “Sign Up” button and fill in your details to create an account.</p>
        </div>

        <div className="faq-item">
          <h3>Q: Is PrepQuiz free to use?</h3>
          <p>A: Yes, most quizzes and practice tests are free. Some premium content may require a subscription.</p>
        </div>

        <div className="faq-item">
          <h3>Q: Can I track my quiz scores?</h3>
          <p>A: Yes, your dashboard shows your quiz history, scores, and progress.</p>
        </div>

        <div className="faq-item">
          <h3>Q: How can I reset my password?</h3>
          <p>A: Go to “Forgot Password” on the login page and follow the instructions.</p>
        </div>

        <div className="faq-item">
          <h3>Q: Can I suggest questions for PrepQuiz?</h3>
          <p>A: Yes, you can submit questions via the “Contact Us” form.</p>
        </div>
      </section>
    </div>
  );
}

export default Faq;
