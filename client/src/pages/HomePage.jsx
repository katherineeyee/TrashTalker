// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import LandingSection from "../components/LandingSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Gamification from "../components/Gamification";
import QuickSignUp from "../components/QuickSignUp";
import Reward from "../components/Reward";
const HomePage = () => {
  return (
    <div id="home" className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <LandingSection />
        <Features />
        <HowItWorks />
        <Gamification />
        <Reward />

        <QuickSignUp />
      </div>
    </div>
  );
};

export default HomePage;
