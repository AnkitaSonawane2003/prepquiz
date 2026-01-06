import React from "react";
import '@styles/Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      
        <div className="footer-brand">
          <h2>PrepQuiz</h2>
          <p>Smart Aptitude & Technical Test Platform for Students</p>
        </div>

        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/features">Features</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p className="email">📧 prepquiz@gmail.com</p>
          <p >📍 Chhatrapati Sambhajinagar</p>
                 <div className="footer-section">
  <h3>Follow Us</h3>
  <div className="social-icons">
    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faGithub} size="lg" />
    </a>
    <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTwitter} size="lg" />
    </a>
    <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faLinkedin} size="lg" />
    </a>
  </div>
</div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 PrepQuiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
