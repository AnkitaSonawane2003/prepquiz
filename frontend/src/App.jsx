import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";

// Pages
import Home from "./pages/Home";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

// Auth Forms
import Register from "./pages/Register";
import RegisterTeacher from "./pages/RegisterTeacher";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Normal routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<RegisterTeacher />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
