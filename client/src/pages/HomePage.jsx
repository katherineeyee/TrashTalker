// src/pages/HomePage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import LandingSection from "../components/LandingSection";
import Features from "../components/Features";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <LandingSection />
        <Features />
      </div>
    </div>
  );
};

export default HomePage;
