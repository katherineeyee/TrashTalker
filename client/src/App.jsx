// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import RewardsPage from "./pages/RewardsPage";
import Glass from "./pages/Glass";
import Plastic from "./pages/Plastic";
import Compost from "./pages/Compost";
import Metal from "./pages/Metal";
import Electronics from "./pages/Electronics";
import Batteries from "./pages/Batteries";
import Rubber from "./pages/Rubber";
import Paper from "./pages/Paper";
import GamePage from "./pages/GamePage";
import Footer from "./components/Footer";
import ImageUploader from "./components/ImageUploader";
import Navbar from "./components/Navbar";
import { onUserStateChange } from "./api/firebase";
import ContactSupport from "./pages/ContactSupport";
import Faq from "./pages/Faq";
import Terms from "./pages/Term";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import QuickSignUp from "./components/QuickSignUp";
import Features from "./components/Features";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onUserStateChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/Glass" element={<Glass />} />
        <Route path="/Plastic" element={<Plastic />} />
        <Route path="/Compost" element={<Compost />} />
        <Route path="/Metal" element={<Metal />} />
        <Route path="/Electronics" element={<Electronics />} />
        <Route path="/Batteries" element={<Batteries />} />
        <Route path="/Rubber" element={<Rubber />} />
        <Route path="/Paper" element={<Paper />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/image-uploader" element={<ImageUploader />} />
        <Route path="/signup" element={<QuickSignUp />} />
        <Route path="/login" element={<QuickSignUp />} />
        <Route path="/features" element={<Features />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer user={user} />
    </Router>
  );
}

export default App;
