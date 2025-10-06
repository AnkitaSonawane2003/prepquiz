import React from 'react';
import "../styles/All.css"; 

function Terms() {
  return (
    <div className="terms-page">
      <section className="terms-section">
        <h1>Terms and Conditions</h1>
        <ul className="terms-list">
          <li><strong>Acceptance of Terms:</strong> Using PrepQuiz means you agree to these terms.</li>
          <li><strong>User Accounts:</strong> Users must provide accurate information and keep their login credentials secure.</li>
          <li><strong>Use of Website:</strong> Users may not misuse the website or post inappropriate content.</li>
          <li><strong>Intellectual Property:</strong> All content (questions, images, logos) belongs to PrepQuiz.</li>
          <li><strong>Termination:</strong> PrepQuiz can suspend accounts violating rules.</li>
          <li><strong>Disclaimers:</strong> PrepQuiz is for educational purposes only; results are indicative.</li>
          <li><strong>Changes to Terms:</strong> Terms may be updated; users are encouraged to review regularly.</li>
        </ul>
      </section>
    </div>
  );
}

export default Terms;
