import React from 'react';
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        {/* Contact Header */}
        <section className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or inquiries? We would be glad to hear from you. Fill
            out the form below and we’ll get back to you as soon as possible.
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <form className="contact-form">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        </section>

        {/* Contact Info */}
        <section className="contact-info">
          <p>📧 Email: prepquiz@gmail.com</p>
          <p>📞 Phone: 123-456-7890</p>
        </section>
      </div>
    </div>
  );
}

export default Contact;
