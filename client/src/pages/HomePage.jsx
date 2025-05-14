import React from "react";
import Navbar from "../components/Navbar";
import LandingSection from "../components/LandingSection";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Gamification from "../components/Gamification";
import QuickSignUp from "../components/QuickSignUp";
import Reward from "../components/Reward";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto">
        <LandingSection />
        <Features />

        <HowItWorks />

        {/* ✅ Game Start Section - Between Features and HowItWorks */}
        <div
          id="game"
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <h2 className="text-3xl font-semibold mb-4">Ready to Play?</h2>
          <p className="text-gray-600 mb-6">
            Test your trash-sorting skills and earn real rewards while playing!
          </p>
          <button
            onClick={startGame}
            className="bg-[#4CAF50] text-white px-8 py-4 rounded-lg text-xl shadow hover:bg-green-600 transition"
          >
            🎮 Start Game
          </button>
        </div>
        <Gamification />
        <Reward />

        <QuickSignUp />
      </div>
    </div>
  );
};

export default HomePage;
