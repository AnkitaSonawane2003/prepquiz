import React from 'react';
import "../styles/All.css"; 

function Privacy() {
  return (
    <div className="privacy-page">
      <section className="privacy-section">
        <h1>Privacy Policy</h1>
        <ul className="privacy-list">
          <li><strong>Information Collected:</strong> Name, email, quiz results, usage data.</li>
          <li><strong>Use of Information:</strong> To improve the site, personalize content, and send updates.</li>
          <li><strong>Cookies & Tracking:</strong> We may use cookies for analytics and site functionality.</li>
          <li><strong>Data Sharing:</strong> Data may be shared with third-party analytics providers, never sold.</li>
          <li><strong>User Rights:</strong> Users can request to see or delete their personal data at any time.</li>
          <li><strong>Security:</strong> We implement industry-standard measures to protect your data.</li>
          <li><strong>Contact:</strong> Reach us at <a href="mailto: prepquiz@gmail.com">prepquiz@gmail.com</a> for privacy concerns.</li>
        </ul>
      </section>
    </div>
  );
}

export default Privacy;
