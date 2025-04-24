import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserStateChange } from '../api/firebase';
import Navbar from "../components/Navbar";
import RewardCard from "../components/RewardCard";
import PointsSummary from "../components/PointsSummary";
import EarnPointsSection from "../components/EarnPointsSection";

import { ReactComponent as AmazonIcon } from "../icons/amazon.svg";
import { ReactComponent as SpotifyIcon } from "../icons/spotify.svg";
import { ReactComponent as NetflixIcon } from "../icons/netflix.svg";
import { ReactComponent as UberEatsIcon } from "../icons/ubereats.svg";

// TODO: add more rewards
const rewards = [
  {
    id: 1,
    name: "Amazon Gift Card",
    description: "Shop from millions of products with your recycling points",
    points: 5000,
    value: "$25 value",
    bg: "bg-blue-50",
    icon: AmazonIcon,
    color: "#FF9900",
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Enjoy ad-free music streaming for a month",
    points: 3000,
    value: "$9.99 value",
    bg: "bg-green-50",
    icon: SpotifyIcon,
    color: "#1ED760",
  },
  {
    id: 3,
    name: "Netflix Gift Card",
    description: "Stream your favorite shows and movies",
    points: 6000,
    value: "$15 value",
    bg: "bg-red-50",
    icon: NetflixIcon,
    color: "#E50914",
  },
  {
    id: 4,
    name: "UberEats Voucher",
    description: "Get your favorite food delivered to your door",
    points: 4000,
    value: "$20 value",
    bg: "bg-yellow-50",
    icon: UberEatsIcon,
    color: "#06C167",
  },
];

const RewardsPage = () => {
  const [authUser, setAuthUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get auth user from Firebase
  useEffect(() => {
    onUserStateChange(setAuthUser);
  }, []);

  useEffect(() => {
    if (authUser?.email) {
      fetchUserData(authUser.email);
    } else {
      setIsLoading(false);
    }
  }, [authUser]);

  const fetchUserData = async (email) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/users');
      const data = await response.json();
      
      // find current user by email
      const currentUser = Array.isArray(data) 
        ? data.find(user => user.email === email)
        : null;
      setUserData(currentUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // temporary handle the redemption process
  const handleRedeem = (reward) => {
    if (userData?.points >= reward.points) {
      alert(`You have successfully redeemed ${reward.name}!`);
    } else {
      alert(`You don't have enough points to redeem ${reward.name}. You need ${reward.points - userData?.points} more points.`);
    }
  };

  // loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rewards...</p>
          </div>
        </div>
      </>
    );
  }

  if (!authUser) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rewards Access</h2>
          <p className="text-gray-600 mb-6">Please log in to view and redeem rewards.</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // combine auth user and fetched user data
  const user = {
    ...authUser,
    ...userData,
    points: userData?.points || 0,
  };

  return (
    <>
      <Navbar />
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Rewards
            </h2>
          </div>

          {/* User Points Summary */}
          <PointsSummary 
            points={user.points} 
            availableRewards={rewards.filter(r => r.points <= user.points).length} 
          />

          {/* Available Rewards */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Rewards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward) => (
                <RewardCard 
                  key={reward.id}
                  reward={reward}
                  userPoints={user.points}
                  onRedeem={handleRedeem}
                />
              ))}
            </div>
          </div>

          {/* How to Earn More Points */}
          <EarnPointsSection />
        </div>
      </section>
    </>
  );
};

export default RewardsPage;