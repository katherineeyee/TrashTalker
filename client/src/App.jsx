// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Glass from "./pages/Glass";
import Plastic from "./pages/Plastic";
import Compost from "./pages/Compost";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Glass" element={<Glass />} />
        <Route path="/Plastic" element={<Plastic />} />
        <Route path="/Compost" element={<Compost />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
