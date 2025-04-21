import React from "react";
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
import {GetTopUsers} from "../hooks/GetTopUsers";

const iconCircle = (Icon, size, bg, text, ring = "") => (
  <div
    className={`w-16 h-16 rounded-full flex items-center justify-center ${bg} ${ring} hover:ring-2`}
  >
    <Icon size={size} className={text} />
  </div>
);

const Gamification = () => {
  const data = GetTopUsers(5);


  const leaderboard = data.map((user, index) => ({
    position: index+1,
    name: user.firstName + ' ' + user.lastName,
    location: user.location,
    points: user.points,
    highlight: true
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

  return (
    <section id="gamification" className="py-20 bg-gray-50">
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
              <button className="text-[#4CAF50] font-medium hover:underline">
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
