// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Glass from "./pages/Glass";
import Plastic from "./pages/Plastic";
import Compost from "./pages/Compost";
import Metal from "./pages/Metal";
import Electronics from "./pages/Electronics";
import Batteries from "./pages/Batteries";
import Rubber from "./pages/Rubber";
import Paper from "./pages/Paper";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/Glass" element={<Glass />} />
        <Route path="/Plastic" element={<Plastic />} />
        <Route path="/Compost" element={<Compost />} />
        <Route path="/Metal" element={<Metal />} />
        <Route path="/Electronics" element={<Electronics />} />
        <Route path="/Batteries" element={<Batteries/>} />
        <Route path="/Rubber" element={<Rubber/>} />
        <Route path="/Paper" element={<Paper/>} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
