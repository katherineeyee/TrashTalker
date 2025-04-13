// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import LandingSection from "../components/LandingSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Gamification from "../components/Gamification";
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <LandingSection />
        <Features />
        <HowItWorks />
        <Gamification />
      </div>
    </div>
  );
};

export default HomePage;
