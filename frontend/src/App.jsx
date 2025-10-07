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
import Adminpage from "./components/Adminpage";
import Teacherpage from "./components/Teacherpage";
import Registerstudent from "./pages/Registerstudent";


// Auth Forms
import Register from "./pages/Register";
import RegisterTeacher from "./pages/RegisterTeacher";
import TeacherLogin from "./pages/TeacherLogin";
import Selection from "./pages/Selection";
import Studentlogin from "./pages/Studentlogin";
import Adminlogin from "./pages/Adminlogin";

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
        <Route path="/login" element={<TeacherLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<RegisterTeacher />} />
         <Route path="/admin" element={<Adminpage />} />
          <Route path="/teacherpage" element={<Teacherpage />} />
            <Route path="/select" element={<Selection />} />
               <Route path="/adminlog" element={<Adminlogin />} />
              <Route path="/student" element={<Studentlogin />} />
                 <Route path="/regstud" element={<Registerstudent/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
