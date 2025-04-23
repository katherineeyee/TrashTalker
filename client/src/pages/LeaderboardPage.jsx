import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { GetTopUsers } from "../hooks/GetTopUsers";
import {
  Leaf,
  Droplet,
  Sun,
  Globe,
  Flame,
  User,
  Clock,
} from "lucide-react";

// Badge data
const badgeIcons = [
  {
    Icon: Leaf,
    label: "Eco Novice",
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    Icon: Droplet,
    label: "Water Saver",
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    Icon: Sun,
    label: "Energy Hero",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    Icon: Globe,
    label: "Global Impact",
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    Icon: Flame,
    label: "On Fire",
    bg: "bg-red-100",
    text: "text-red-600",
  },
];

const LeaderboardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = GetTopUsers(100); // fetch all users

  const usersWithAvatars = data.map((user, index) => {
    const Avatar = {
      Icon: User,
      bg: "bg-blue-100",
      text: "text-blue-600",
    };
  
    // get badges from database
    const userBadges =
      user.badges?.map((badgeName) =>
        badgeIcons.find((badge) => badge.label === badgeName)
      )?.filter(Boolean) || [];
  
    return {
      ...user,
      avatar: Avatar,
      badges: userBadges,
      // implement streak
      streak: user.streak || 0,
    };
  });
  
  return (
    <>
      <Navbar />

      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Full Leaderboard
          </h2>
          
          {/* Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {usersWithAvatars.slice(0, 3).map((user, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg shadow-md flex flex-col items-center ${
                  index === 0 ? "bg-yellow-100" : 
                  index === 1 ? "bg-gray-200" : "bg-amber-100"
                }`}
              >
                <div className="relative mb-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${user.avatar.bg}`}>
                    <user.avatar.Icon size={32} className={user.avatar.text} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? "bg-yellow-500" : 
                    index === 1 ? "bg-gray-500" : "bg-amber-600"
                  } text-white font-bold`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 mb-2">{user.location}</p>
                <p className="text-2xl font-bold text-[#4CAF50]">{user.points} pts</p>
                
                {/* Badges */}
                <div className="flex mt-3 space-x-1">
                  {user.badges.map((badge, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${badge.bg}`}
                      title={badge.label}
                    >
                      <badge.Icon size={12} className={badge.text} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Full Leaderboard List */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-4 mb-4 px-4 font-semibold text-gray-700">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">User</div>
              <div className="col-span-3">Badges</div>
              <div className="col-span-2">Streak</div>
              <div className="col-span-2 text-right">Points</div>
            </div>
            
            {usersWithAvatars.map((user, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                  index < 3 ? "bg-[#4CAF50]/10" : 
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <div className="col-span-1 font-medium text-gray-600">
                  {index + 1}
                </div>
                
                <div className="col-span-4 flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.avatar.bg} mr-3`}>
                    <user.avatar.Icon size={20} className={user.avatar.text} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-xs text-gray-500">{user.location}</p>
                  </div>
                </div>
                
                <div className="col-span-3 flex flex-wrap gap-1">
                  {user.badges.length > 0 ? (
                    user.badges.map((badge, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${badge.bg} tooltip`}
                        data-tip={badge.label}
                      >
                        <badge.Icon size={12} className={badge.text} />
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No badges yet</span>
                  )}
                </div>
                
                <div className="col-span-2 flex items-center">
                  <Clock size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm font-medium">
                    {user.streak} day{user.streak !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="col-span-2 text-right font-bold text-[#4CAF50]">
                  {user.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderboardPage;