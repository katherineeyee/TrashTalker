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
import { ReactComponent as AMCIcon } from "../icons/amc.svg";
import { ReactComponent as ChipotleIcon } from "../icons/chipotle.svg";
import { ReactComponent as DoorDashIcon } from "../icons/doordash.svg";
import { ReactComponent as JambaJuiceIcon } from "../icons/jambajuice.svg";
import { ReactComponent as McDonaldsIcon } from "../icons/mcdonalds.svg";
import { ReactComponent as PandaExpressIcon } from "../icons/pandaexpress.svg";
import { ReactComponent as StarbucksIcon } from "../icons/starbucks.svg";
import { ReactComponent as TargetIcon } from "../icons/target.svg";

// TODO: add more rewards
const rewards = [
  {
    id: 1,
    name: "Amazon",
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
    value: "$10 value",
    bg: "bg-green-50",
    icon: SpotifyIcon,
    color: "#1ED760",
  },
  {
    id: 3,
    name: "Netflix",
    description: "Stream your favorite shows and movies",
    points: 6000,
    value: "$15 value",
    bg: "bg-red-50",
    icon: NetflixIcon,
    color: "#E50914",
  },
  {
    id: 4,
    name: "UberEats",
    description: "Get your favorite food delivered to your door",
    points: 4000,
    value: "$20 value",
    bg: "bg-yellow-50",
    icon: UberEatsIcon,
    color: "#06C167",
  },
  {
    id: 5,
    name: "AMC Theatres",
    description: "Enjoy the latest movies with theatre treats",
    points: 4500,
    value: "$20 value",
    bg: "bg-purple-50",
    icon: AMCIcon,
    color: "#D32F2F",
  },
  {
    id: 6,
    name: "Chipotle",
    description: "Build your perfect combo for burrito or bowl",
    points: 3500,
    value: "$15 value",
    bg: "bg-orange-50",
    icon: ChipotleIcon,
    color: "#FF7A00",
  },
  {
    id: 7,
    name: "DoorDash",
    description: "Food delivery from your favorite local restaurants",
    points: 6000,
    value: "$25 value",
    bg: "bg-red-50",
    icon: DoorDashIcon,
    color: "#FF3008",
  },
  {
    id: 8,
    name: "Jamba Juice",
    description: "Healthy smoothies and energy bowls",
    points: 2500,
    value: "$10 value",
    bg: "bg-pink-50",
    icon: JambaJuiceIcon,
    color: "#ED1C24",
  },
  {
    id: 9,
    name: "McDonald's",
    description: "Classic burgers, fries, and McCafé drinks",
    points: 3000,
    value: "$15 value",
    bg: "bg-yellow-50",
    icon: McDonaldsIcon,
    color: "#FFC72C",
  },
  {
    id: 10,
    name: "Panda Express",
    description: "Delicious Chinese fast food favorites",
    points: 2000,
    value: "$10 value",
    bg: "bg-red-50",
    icon: PandaExpressIcon,
    color: "#D22630",
  },
  {
    id: 11,
    name: "Starbucks",
    description: "Premium coffee, seasonal drinks, and snacks",
    points: 2000,
    value: "$10 value",
    bg: "bg-green-50",
    icon: StarbucksIcon,
    color: "#006241",
  },
  {
    id: 12,
    name: "Target",
    description: "Everything from groceries to electronics",
    points: 5500,
    value: "$25 value",
    bg: "bg-red-50",
    icon: TargetIcon,
    color: "#CC0000",
  }
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

  const handleRedeem = async (reward) => {
    if (!userData || userData.points < reward.points) {
      alert(`You don't have enough points to redeem ${reward.name}. You need ${reward.points - userData?.points} more points.`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/api/users/${encodeURIComponent(user.email)}/points?numPoints=-${reward.points}`,
        { method: 'PUT' }
      );

      if (!response.ok) {
        throw new Error('Failed to update user points');
      }

      alert(`You have successfully redeemed ${reward.name}!`);
      fetchUserData(user.email); // refresh point total
    } catch (error) {
      console.error('Redemption failed:', error);
      alert('Something went wrong while redeeming your reward.');
    }
  };

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
          <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Browse Rewards
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