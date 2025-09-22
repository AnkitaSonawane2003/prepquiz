import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import About from './components/About';
import Features from './components/Features';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy/>}/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
