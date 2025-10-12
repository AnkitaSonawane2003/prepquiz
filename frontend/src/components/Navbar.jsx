import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Check login status on mount
 useEffect(() => {
  const checkLogin = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("studentToken") || localStorage.getItem("teacherToken");
    setIsLoggedIn(!!token);
  };

  checkLogin();

  window.addEventListener("login", checkLogin);
  window.addEventListener("logout", checkLogin);

  return () => {
    window.removeEventListener("login", checkLogin);
    window.removeEventListener("logout", checkLogin);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("teacherToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img
          src={Logo}
          alt="Logo"
          className="navbar-logo"
          style={{
            height: "80px",
            width: "auto",
            borderRadius: "18px",
            border: "1px solid red",
          }}
        />
        <span className="brand-name">PrepQuiz</span>
      </div>

      <button className="menu-icon" onClick={toggleMenu} aria-label="Toggle Menu">
        ☰
      </button>

      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link to="/features" onClick={closeMenu}>Features</Link>
        </li>

        {!isLoggedIn ? (
          <li>
            <Link to="/selection" onClick={closeMenu}>Login/Register</Link>
          </li>
        ) : (
     <li>
  <button
    onClick={() => {
      closeMenu();
      handleLogout();
    }}
    className="nav-link"
  >
    Logout
  </button>
</li>


        )}
      </ul>
    </nav>
  );
};

export default Navbar;
