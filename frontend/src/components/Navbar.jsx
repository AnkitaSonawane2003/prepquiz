import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // "teacher", "student", "admin", or null

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // utility to check login and role from localStorage
  const checkLoginStatus = () => {
    if (localStorage.getItem("teacherToken")) {
      return { isLoggedIn: true, userRole: "teacher" };
    } else if (localStorage.getItem("studentToken")) {
      return { isLoggedIn: true, userRole: "student" };
    } else if (localStorage.getItem("token")) {
      return { isLoggedIn: true, userRole: "admin" };
    } else {
      return { isLoggedIn: false, userRole: null };
    }
  };

  // On mount, set login state from storage
  useEffect(() => {
    const { isLoggedIn, userRole } = checkLoginStatus();
    setIsLoggedIn(isLoggedIn);
    setUserRole(userRole);
  }, []);

  // Listen to login/logout events
  useEffect(() => {
    const updateLoginStatus = () => {
      const { isLoggedIn, userRole } = checkLoginStatus();
      setIsLoggedIn(isLoggedIn);
      setUserRole(userRole);
    };

    window.addEventListener("login", updateLoginStatus);
    window.addEventListener("logout", updateLoginStatus);

    return () => {
      window.removeEventListener("login", updateLoginStatus);
      window.removeEventListener("logout", updateLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setUserRole(null);
    window.dispatchEvent(new Event("logout"));
    navigate("/");
  };

  // Scroll effect (optional)
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProfileLink = () => {
    if (userRole === "teacher") return "/teacherprofile";
    if (userRole === "student") return "/studentprofile";
    if (userRole === "admin") return "/admin/dashboard";
    return "/";
  };

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

      <button
        className="menu-icon"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </li>
        <li>
          <Link to="/features" onClick={closeMenu}>
            Features
          </Link>
        </li>

        {!isLoggedIn ? (
          <li>
            <Link to="/selection" onClick={closeMenu}>
              Login/Register
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to={getProfileLink()} onClick={closeMenu}>
                Profile
              </Link>
            </li>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
