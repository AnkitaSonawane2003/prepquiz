import React, { useEffect, useState } from "react";
import "../styles/Doubt.css";

function Doubt() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("https://prepquiz.onrender.com/api/contact");
        const data = await res.json();
        console.log("Fetched messages:", data.messages);
        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching contact messages:", error);
        setError("Failed to load messages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="doubt-page">
      <h1>Submitted Doubts </h1>

      {loading && <p>Loading...</p>}

      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && messages.length === 0 && <p>No messages submitted yet.</p>}

      {!loading && !error && messages.length > 0 && (
        <ul className="doubt-list">
          {messages.map((msg) => (
            <li key={msg._id} className="doubt-card">
              <h3>{msg.name} ({msg.email})</h3>
              <p><strong>Message:</strong> {msg.message}</p>
              <p className="timestamp">
                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "No date"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Doubt;
