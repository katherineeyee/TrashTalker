import React, { useState, useEffect } from "react";
import {
  Leaf,
  Droplet,
  Sun,
  Globe,
  Plus,
  Recycle,
  Sprout,
  Trash2,
  Info,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Award,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login, onUserStateChange } from "../api/firebase";
import { GetTopUsers } from "../hooks/GetTopUsers";

/*style for the card header*/
const CardHeader = ({ title, iconComponent }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center">
      <h3 className="text-xl font-semibold text-gray-700 mr-2">{title}</h3>
      {iconComponent}
    </div>
  </div>
);

const Gamification = () => {
  const [showPointsGuide, setShowPointsGuide] = useState(false);
  const data = GetTopUsers(5);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authDialogActive, setAuthDialogActive] = useState(false);

  //bin types
  const BIN_TYPES = {
    Recycle: {
      icon: Recycle,
      color: "text-green-600",
      bg: "bg-green-100",
      hover: "hover:bg-green-200",
      description: "Paper, glass, plastic, and metal",
    },
    Compost: {
      icon: Sprout,
      color: "text-amber-600",
      bg: "bg-amber-100",
      hover: "hover:bg-amber-200",
      description: "Food scraps and yard waste",
    },
    Landfill: {
      icon: Trash2,
      color: "text-gray-600",
      bg: "bg-gray-100",
      hover: "hover:bg-gray-200",
      description: "Non-recyclable and non-compostable items",
    },
  };

  const badges = [
    {
      Icon: Leaf,
      label: "Eco Novice",
      bg: "bg-green-100",
      text: "text-green-600",
      ring: "hover:ring-green-300",
      description: "Start your recycling journey",
    },
    {
      Icon: Droplet,
      label: "Water Saver",
      bg: "bg-blue-100",
      text: "text-blue-600",
      ring: "hover:ring-blue-300",
      description: "Recycle 10 items",
    },
    {
      Icon: Sun,
      label: "Energy Hero",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      ring: "hover:ring-yellow-300",
      description: "Save energy by recycling 100+ items",
    },
    {
      Icon: Globe,
      label: "Global Impact",
      bg: "bg-purple-100",
      text: "text-purple-600",
      ring: "hover:ring-purple-300",
      description: "Reach 10,000 points",
    },
    {
      Icon: Flame,
      label: "On Fire",
      bg: "bg-red-100",
      text: "text-red-600",
      ring: "hover:ring-red-300",
      description: "7 recycling streak",
    },
    {
      Icon: Plus,
      label: "Unlock More",
      bg: "bg-gray-200",
      text: "text-gray-500",
      ring: "hover:ring-gray-300",
      description: "Keep recycling to unlock",
    },
  ];

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onUserStateChange((currentUser) => {
      setUser(currentUser);

      // If user just logged in and dialog was active, remove dialog and navigate
      if (currentUser && authDialogActive) {
        removeAuthDialog();
        navigate("/leaderboard");
      }
    });

    // Cleanup subscription
    return () => unsubscribe?.();
  }, [navigate, authDialogActive]);

  // Function to remove dialog
  const removeAuthDialog = () => {
    const dialogElement = document.getElementById("auth-dialog");
    if (dialogElement) {
      document.body.removeChild(dialogElement);
    }
    setAuthDialogActive(false);
  };

  const leaderboard = data.map((user, index) => ({
    position: index + 1,
    name: user.firstName + " " + user.lastName,
    location: user.location,
    points: user.points,
    highlight: true,
  }));

  // Handle leaderboard click with authentication check
  const handleLeaderboardClick = () => {
    if (user) {
      navigate("/leaderboard");
    } else {
      // Show authentication
      showAuthOptions();
    }
  };

  // Authentication options
  const showAuthOptions = () => {
    setAuthDialogActive(true);

    const authDialog = document.createElement("div");
    authDialog.id = "auth-dialog";
    authDialog.className =
      "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    authDialog.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Sign in Required</h3>
        <p class="mb-6 text-gray-600">
          You need to be logged in to view the full leaderboard. Please sign in or create an account.
        </p>
        <div class="flex justify-between">
          <button id="login-btn" 
            class="px-5 py-2 bg-[#4CAF50] text-white rounded hover:bg-opacity-90 font-medium">
            Log In
          </button>
          <button id="signup-btn"
            class="px-5 py-2 border border-[#4CAF50] text-[#4CAF50] rounded hover:bg-opacity-10 hover:bg-[#4CAF50] transition font-medium">
            Sign Up
          </button>
          <button id="cancel-btn"
            class="px-5 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(authDialog);

    document.getElementById("login-btn").addEventListener("click", () => {
      document.getElementById("login-btn").textContent = "Loading...";
      document.getElementById("login-btn").disabled = true;

      login().catch((error) => {
        console.error("Login failed:", error);
        removeAuthDialog();
      });
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
      removeAuthDialog();
      navigate("/#signup");
      setTimeout(() => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("signup", "true");
        window.history.replaceState({}, "", newUrl);
        window.dispatchEvent(new Event("popstate"));
      }, 100);
    });

    document.getElementById("cancel-btn").addEventListener("click", () => {
      removeAuthDialog();
    });

    authDialog.addEventListener("click", (e) => {
      if (e.target === authDialog) {
        removeAuthDialog();
      }
    });
  };

  return (
    <div id="scoreboard" className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Gamify Your Recycling Journey
      </h2>
      <p className=" text-lg text-gray-600 text-center mb-3">
        Make a positive environmental impact while having fun and earning
        rewards
      </p>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Recycling Bins - Left Side */}
          <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <CardHeader
              title="Recycling Bins"
              iconComponent={
                <button
                  onClick={() => setShowPointsGuide(!showPointsGuide)}
                  className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <HelpCircle size={16} />
                </button>
              }
            />

            {showPointsGuide && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
                <h3 className="font-medium text-blue-800 mb-2">Points Rules</h3>
                <p className="mb-2">
                  Points are awarded only when you correctly identify the proper
                  bin for each item:
                </p>
                <div className="flex items-center mb-2 text-green-700">
                  <CheckCircle size={16} className="mr-2" />
                  <span>Correct answer: +10 points and streak continues</span>
                </div>
                <div className="flex items-center text-red-700">
                  <AlertTriangle size={16} className="mr-2" />
                  <span>Wrong answer: 0 points and streak resets</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {Object.entries(BIN_TYPES).map(
                ([name, { icon: Icon, color, bg, description }], i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center mb-1">
                      <div
                        className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center mr-3`}
                      >
                        <Icon size={20} className={color} />
                      </div>
                      <span className="font-medium text-gray-800">
                        {name} Bin
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-13 pl-10">
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Game Rules & Streak System - Right Side */}
          <div className="w-full md:w-1/2 p-6">
            <CardHeader
              title="Game Rules"
              iconComponent={
                <button className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                  <Info size={16} />
                </button>
              }
            />

            <div className="space-y-4">
              {/* Quiz Section */}
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Award className="text-indigo-600 mr-2" size={18} />
                  Recycling Quiz
                </h4>
                <ul className="text-gray-600 text-sm space-y-2">
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Correctly identify which bin an item belongs in (Recycle,
                      Compost, or Landfill)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span>Earn 10 points for each correct answer</span>
                  </li>
                  <li className="flex items-start">
                    <AlertTriangle
                      size={16}
                      className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span>
                      Incorrect answers earn 0 points and reset your streak
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span>Maintain a streak for bonus points and badges</span>
                  </li>
                </ul>
              </div>

              {/* Streak System */}
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Flame className="text-red-600 mr-2" size={18} />
                  Streak System
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Your streak increases by 1 for each correct answer, but resets
                  to 0 when you answer incorrectly. Higher streaks unlock
                  special badges and bonus points!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Badges*/}
      <div className="bg-white rounded-xl shadow-md mt-8 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Achievement Badges
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map(({ Icon, label, bg, text, ring, description }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform p-4 rounded-lg border hover:shadow-md"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${bg} ${ring} hover:ring-2 mb-3`}
              >
                <Icon size={28} className={text} />
              </div>
              <p className="font-medium text-gray-800">{label}</p>
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard  */}

      <div className="bg-white rounded-xl shadow-md mt-8 p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Top Recyclers This Month
        </h3>
        <div className="space-y-4">
          {leaderboard.map(
            ({ position, name, location, points, highlight }, i) => (
              <div
                key={i}
                className={`flex items-center p-4 rounded ${
                  highlight ? "bg-[#4CAF50]/5" : "bg-gray-100"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full text-white font-bold flex items-center justify-center ${
                    position === "A"
                      ? "bg-[#4CAF50]"
                      : position <= 3
                      ? position === 1
                        ? "bg-yellow-600"
                        : position === 2
                        ? "bg-gray-500"
                        : "bg-amber-600"
                      : "bg-gray-400"
                  }`}
                >
                  {position}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium text-gray-800">{name}</h4>
                  <p className="text-sm text-gray-500">{location}</p>
                </div>
                <div
                  className={`font-bold ${
                    highlight ? "text-[#4CAF50]" : "text-gray-700"
                  }`}
                >
                  {points} pts
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleLeaderboardClick}
            className="text-[#4CAF50] font-medium hover:underline"
          >
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
