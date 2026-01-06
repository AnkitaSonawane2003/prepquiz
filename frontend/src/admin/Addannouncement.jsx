import React, { useState } from 'react';
import '../styles/announcement.css';


function Addannouncement() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Message cannot be empty' });
      return;
    }

    try {
      const res = await fetch('https://prepquiz.onrender.com/api/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', text: data.message });
        setMessage(''); // clear input
      } else {
        setStatus({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      setStatus({ type: 'error', text: 'Server error. Please try again.' });
    }
  };

  return (
    <div className="announcement-form-container">
      <h2>Add New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your announcement here..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      
      {status && (
        <p style={{ color: status.type === 'error' ? 'red' : 'green' }}>
          {status.text}
        </p>
      )}
    </div>
  );
}

export default Addannouncement;
