import React, { useState, useEffect } from "react";
import {
  Leaf,
  Droplet,
  Sun,
  Globe,
  Flame,
  Plus,
  RefreshCw,
  FileText,
  CupSoda,
  Wine,
} from "lucide-react";
import { GetTopUsers } from "../hooks/GetTopUsers";
import { useNavigate } from "react-router-dom";
import { login, onUserStateChange } from "../api/firebase";

const iconCircle = (Icon, size, bg, text, ring = "") => (
  <div
    className={`w-16 h-16 rounded-full flex items-center justify-center ${bg} ${ring} hover:ring-2`}
  >
    <Icon size={size} className={text} />
  </div>
);

const Gamification = () => {
  const data = GetTopUsers(5);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authDialogActive, setAuthDialogActive] = useState(false);

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

  // Function to remove dialog - defined outside so it can be used anywhere
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

  const points = [
    {
      Icon: RefreshCw,
      label: "Plastic Bottle",
      pts: 5,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      Icon: FileText,
      label: "Paper/Cardboard",
      pts: 10,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      Icon: CupSoda,
      label: "Aluminum Can",
      pts: 15,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      Icon: Wine,
      label: "Glass ",
      pts: 20,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  ];

  const badges = [
    {
      Icon: Leaf,
      label: "Eco Novice",
      bg: "bg-green-100",
      text: "text-green-600",
      ring: "hover:ring-green-300",
    },
    {
      Icon: Droplet,
      label: "Water Saver",
      bg: "bg-blue-100",
      text: "text-blue-600",
      ring: "hover:ring-blue-300",
    },
    {
      Icon: Sun,
      label: "Energy Hero",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      ring: "hover:ring-yellow-300",
    },
    {
      Icon: Globe,
      label: "Global Impact",
      bg: "bg-purple-100",
      text: "text-purple-600",
      ring: "hover:ring-purple-300",
    },
    {
      Icon: Flame,
      label: "On Fire",
      bg: "bg-red-100",
      text: "text-red-600",
      ring: "hover:ring-red-300",
    },
    {
      Icon: Plus,
      label: "Unlock More",
      bg: "bg-gray-200",
      text: "text-gray-500",
      ring: "hover:ring-gray-300",
    },
  ];

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
    <section id="scoreboard" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Gamify Your Recycling Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Make a positive environmental impact while having fun and earning
            rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <div className="bg-white p-8 rounded shadow-md">
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
                          ? position === 2
                            ? "bg-gray-500"
                            : "bg-yellow-600"
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

          {/* Points System + Badges */}
          <div className="space-y-8">
            {/* Points */}
            <div className="bg-white p-8 rounded shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Points System
              </h3>
              <div className="space-y-4">
                {points.map(({ Icon, label, pts, bg, text }, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center">
                      {iconCircle(Icon, 20, bg, text)}
                      <span className="ml-3 text-gray-700">{label}</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {pts} points
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white p-8 rounded shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Achievement Badges
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {badges.map(({ Icon, label, bg, text, ring }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center hover:scale-105 transition-transform"
                  >
                    {iconCircle(Icon, 28, bg, text, ring)}
                    <p className="mt-2 text-sm font-medium text-gray-700">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamification;
