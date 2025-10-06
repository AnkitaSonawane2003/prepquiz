import React from 'react'
import "../styles/Contact.css"
function Contact() {
  return (
   <div className="contact-page">
      {/* Contact Header */}
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or inquiries? We would be glad to hear from you. Fill
          out the form below and we'll get back to you shortly.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <form className="contact-form" >
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
           
            required
          />

         

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
           
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>

       
      </section>

      {/* Contact Info (Optional) */}
      <section className="contact-info">
        <p>Email:📧 prepquiz@gmail.com</p>
        <p>Phone: 123-456-7890</p>
      </section>
    </div>
  )
}

export default Contact
