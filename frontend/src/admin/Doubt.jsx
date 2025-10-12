import React, { useEffect, useState } from "react";
import "../styles/Doubt.css"; // optional, for styling

function Doubt() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/contact");
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching contact messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="doubt-page">
      <h1>Submitted Doubts / Contact Messages</h1>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length === 0 ? (
        <p>No messages submitted yet.</p>
      ) : (
        <ul className="doubt-list">
          {messages.map((msg, index) => (
            <li key={index} className="doubt-card">
              <h3>{msg.name} ({msg.email})</h3>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="timestamp">{new Date(msg.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Doubt;
