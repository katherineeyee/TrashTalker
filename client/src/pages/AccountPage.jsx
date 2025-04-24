import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserStateChange } from '../api/firebase';
import Navbar from "../components/Navbar";
import { ReactComponent as AmazonIcon } from "../icons/amazon.svg";
import { ReactComponent as SpotifyIcon } from "../icons/spotify.svg";
import { ReactComponent as NetflixIcon } from "../icons/netflix.svg";
import { ReactComponent as UberEatsIcon } from "../icons/ubereats.svg";

import { 
  User, Award, Gift, Star, Clock, Zap, ChevronRight,
  Leaf, Droplet, Trophy, Globe, Sun, Flame, Plus,
  RefreshCw, FileText, CupSoda, Wine, MapPin, Calendar, Mail
} from 'lucide-react';

import UserInfoCard from '../components/UserInfoCard';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import PointSystemItem from '../components/PointSystemItem';
import RewardItem from '../components/RewardItem';
import QuickActionButton from '../components/QuickActionButton';


// constants
const badges = [
  {
    id: 1,
    Icon: Leaf,
    name: "Eco Novice",
    bg: "bg-green-100",
    text: "text-green-600",
    ring: "hover:ring-green-300",
  },
  {
    id: 2,
    Icon: Droplet,
    name: "Water Saver",
    bg: "bg-blue-100",
    text: "text-blue-600",
    ring: "hover:ring-blue-300",
  },
  {
    id: 3,
    Icon: Sun,
    name: "Energy Hero",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    ring: "hover:ring-yellow-300",
  },
  {
    id: 4,
    Icon: Globe,
    name: "Global Impact",
    bg: "bg-purple-100",
    text: "text-purple-600",
    ring: "hover:ring-purple-300",
  },
  {
    id: 5,
    Icon: Flame,
    name: "On Fire",
    bg: "bg-red-100",
    text: "text-red-600",
    ring: "hover:ring-red-300",
  },
];

const rewards = [
  {
    id: 1,
    name: "Amazon Gift Card",
    points: "5,000 points",
    value: "$25 value",
    bg: "bg-blue-50",
    icon: AmazonIcon,
    color: "#FF9900",
  },
  {
    id: 2,
    name: "Spotify Premium",
    points: "3,000 points",
    value: "$9.99 value",
    bg: "bg-green-50",
    icon: SpotifyIcon,
    color: "#1ED760",
  },
  {
    id: 3,
    name: "Netflix Gift Card",
    points: "6,000 points",
    value: "$15 value",
    bg: "bg-red-50",
    icon: NetflixIcon,
    color: "#E50914",
  },
  {
    id: 4,
    name: "UberEats Voucher",
    points: "4,000 points",
    value: "$20 value",
    bg: "bg-yellow-50",
    icon: UberEatsIcon,
    color: "#06C167",
  },
];

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
    label: "Glass",
    pts: 20,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
];

// main account page component
const AccountPage = () => {
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

  // loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="h-screen flex justify-center items-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }
  if (!authUser) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Access</h2>
          <p className="text-gray-600 mb-6">Please log in to view your account details.</p>
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
    firstName: userData?.firstName || authUser.displayName?.split(' ')[0] || '',
    lastName: userData?.lastName || authUser.displayName?.split(' ')[1] || '',
    email: userData?.email || authUser.email,
    points: userData?.points || 0,
    streak: userData?.streak || 0,
    badges: userData?.badges || [],
    location: userData?.location || 'Not specified',
    dateCreated: userData?.dateCreated || authUser.metadata?.creationTime,
    rewards: userData?.rewards || [],
    level: Math.floor((userData?.points || 0) / 1000) + 1
  };
  // get badges with achieved status
  const userBadges = badges.map(badge => ({
    ...badge,
    achieved: user.badges?.includes(badge.name) || false,
  }));
  const earnedRewards = rewards.filter(reward => user.rewards.includes(reward.name));
  // calc points to next level
  const pointsToNextLevel = 1000 - (user.points % 1000);
  const levelProgress = (user.points % 1000) / 10; // 0-100%

  return (
    <>
      <Navbar />
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            My Account
          </h2>
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* User Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mb-4 shadow-inner">
                  <User size={35} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                {/* User Info Cards */}
                <div className="w-full space-y-3 mt-2">
                  <UserInfoCard 
                    icon={Mail} 
                    label="Email" 
                    value={user.email} 
                  />
                  <UserInfoCard 
                    icon={MapPin} 
                    label="Location" 
                    value={user.location} 
                  />
                  <UserInfoCard 
                    icon={Calendar} 
                    label="Member Since" 
                    value={new Date(user.dateCreated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                  />
                </div>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">My Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard 
                  icon={Star} 
                  label="Points" 
                  value={user.points} 
                  bgColor="bg-[#4CAF50]/10" 
                  textColor="text-[#4CAF50]" 
                />
                <StatCard 
                  icon={Award} 
                  label="Level" 
                  value={user.level} 
                  bgColor="bg-blue-100" 
                  textColor="text-blue-600" 
                /> 
                <StatCard 
                  icon={Clock} 
                  label="Day Streak" 
                  value={user.streak} 
                  bgColor="bg-amber-100" 
                  textColor="text-amber-600" 
                />
              </div>
              
              {/* Progress Bar */}
              <div className="mt-10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-600">Level {user.level}</span>
                  <span className="font-medium text-gray-600">Level {user.level + 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#4CAF50] h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center mt-2 text-gray-500">
                  {pointsToNextLevel} points to next level
                </p>
              </div>
            </div>
          </div>
          
          {/* Badges & Points System */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Badges */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">My Badges</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {userBadges.map(badge => (
                  <Badge 
                    key={badge.id} 
                    badge={badge} 
                    achieved={badge.achieved} 
                  />
                ))}
                <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:scale-105 transition-transform cursor-default focus:outline-none"
                  tabIndex={0}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-gray-200 hover:ring-gray-300 hover:ring-2">
                    <Plus size={20} className="text-gray-500" />
                  </div>
                  <p className="text-sm text-center font-medium text-gray-500">
                    Unlock More
                  </p>
                </div>
              </div>
            </div>
            
            {/* Points System */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Points System</h3>
              </div>
              <div className="space-y-4">
                {points.map((item, i) => (
                  <PointSystemItem 
                    key={i} 
                    Icon={item.Icon} 
                    label={item.label} 
                    pts={item.pts} 
                    bg={item.bg} 
                    text={item.text} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Rewards History */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Reward History</h3>
              <button 
                className="text-sm text-[#4CAF50] hover:underline flex items-center focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50 rounded px-2 py-1"
                onClick={() => navigate('/rewards')}
              >
                Browse Rewards <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
            {earnedRewards.length === 0 ? (
              <div className="text-center py-8">
                <Gift size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No rewards earned yet</p>
                <button 
                  className="mt-4 text-[#4CAF50] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-opacity-50 rounded px-2 py-1"
                  onClick={() => navigate('/rewards')}
                >
                  Browse Rewards
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {earnedRewards.map(reward => (
                  <RewardItem key={reward.id} reward={reward} />
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickActionButton 
                icon={Zap} 
                label="Scan Items" 
                bgColor="bg-blue-100" 
                iconColor="text-blue-600" 
              />
              <QuickActionButton 
                icon={Gift} 
                label="Redeem Rewards" 
                bgColor="bg-green-100" 
                iconColor="text-green-600" 
                onClick={() => navigate('/rewards')}
              />
              <QuickActionButton 
                icon={Trophy} 
                label="Leaderboard" 
                bgColor="bg-purple-100" 
                iconColor="text-purple-600" 
                onClick={() => navigate('/leaderboard')}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;