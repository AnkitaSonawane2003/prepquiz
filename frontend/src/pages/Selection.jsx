import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/background.webp"; // Make sure this path is correct
import '../styles/selection.css';

function Selection() {
  const navigate = useNavigate();

  const options = [
    { label: 'Student', path: '/student', color: '#6c63ff' },
    { label: 'Teacher', path: '/login', color: '#ff6584' },
    { label: 'Admin', path: '/adminlog', color: '#00b894' },
  ];

  return (
    <div
      className="selection-container"
      style={{
  backgroundImage: `
  
    url(${backgroundImage})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  position: 'relative',
  color: '#fff',
}}

    >
      <h1 className="selection-title">Login As</h1>
      <div className="cards-wrapper">
        {options.map(({ label, path, color }) => (
          <div
            key={label}
            className="selection-card"
            style={{ borderColor: color }}
            onClick={() => navigate(path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(path);
            }}
          >
            <div className="card-content" style={{ backgroundColor: color }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Selection;
