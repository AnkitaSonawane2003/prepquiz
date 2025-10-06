import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // 👇 Scroll effect hook
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={Logo}
          alt="Logo"
          className="navbar-logo"
          style={{
            height: '80px',
            width: 'auto',
            borderRadius: '18px',
            border: '1px solid red'
          }}
        />
        <span className="brand-name">PrepQuiz</span>
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="menu-icon"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link to="/features" onClick={closeMenu}>Features</Link>
        </li>
        <li>
          <Link to="/login" onClick={closeMenu}>Login/Register</Link>
        </li>
        {/* <li>
  <Link to="/login" onClick={closeMenu}>Login/Register</Link>
</li> */}

      </ul>
    </nav>
  );
};

export default Navbar;
