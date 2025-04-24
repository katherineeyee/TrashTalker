import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AmazonIcon } from "../icons/amazon.svg";
import { ReactComponent as SpotifyIcon } from "../icons/spotify.svg";
import { ReactComponent as NetflixIcon } from "../icons/netflix.svg";
import { ReactComponent as UberEatsIcon } from "../icons/ubereats.svg";
import { onUserStateChange, login } from "../api/firebase";

const rewards = [
  {
    id: 1,
    name: "Amazon Gift Card",
    description: "Shop from millions of products with your recycling points",
    points: "5,000 points",
    value: "$25 value",
    bg: "bg-blue-50",
    icon: AmazonIcon,
    color: "#FF9900",
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Enjoy ad-free music streaming for a month",
    points: "3,000 points",
    value: "$10 value",
    bg: "bg-green-50",
    icon: SpotifyIcon,
    color: "#1ED760",
  },
  {
    id: 3,
    name: "Netflix Gift Card",
    description: "Stream your favorite shows and movies",
    points: "6,000 points",
    value: "$15 value",
    bg: "bg-red-50",
    icon: NetflixIcon,
    color: "#E50914",
  },
  {
    id: 4,
    name: "UberEats Voucher",
    description: "Get your favorite food delivered to your door",
    points: "4,000 points",
    value: "$20 value",
    bg: "bg-yellow-50",
    icon: UberEatsIcon,
    color: "#06C167",
  },
];

const Reward = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authDialogActive, setAuthDialogActive] = useState(false);

  useEffect(() => {
    const unsubscribe = onUserStateChange((currentUser) => {
      setUser(currentUser);
      if (currentUser && authDialogActive) {
        removeAuthDialog();
        navigate('/rewards');
      }
    });
    return () => unsubscribe?.();
  }, [navigate, authDialogActive]);
  const removeAuthDialog = () => {
    const dialogElement = document.getElementById('auth-dialog');
    if (dialogElement) {
      document.body.removeChild(dialogElement);
    }
    setAuthDialogActive(false);
  };

  const handleRewardsClick = () => {
    if (user) {
      navigate('/rewards');
    } else {
      showAuthOptions();
    }
  };

  const showAuthOptions = () => {
    setAuthDialogActive(true);
    
    const authDialog = document.createElement('div');
    authDialog.id = 'auth-dialog';
    authDialog.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
    authDialog.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Sign in Required</h3>
        <p class="mb-6 text-gray-600">
          You need to be logged in to browse and redeem rewards. Please sign in or create an account.
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

    document.getElementById('login-btn').addEventListener('click', () => {
      document.getElementById('login-btn').textContent = 'Loading...';
      document.getElementById('login-btn').disabled = true;
      
      login().catch((error) => {
        console.error("Login failed:", error);
        removeAuthDialog();
      });
    });

    document.getElementById('signup-btn').addEventListener('click', () => {
      removeAuthDialog();
      navigate('/#signup');
      setTimeout(() => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('signup', 'true');
        window.history.replaceState({}, '', newUrl);
        window.dispatchEvent(new Event('popstate'));
      }, 100);
    });

    document.getElementById('cancel-btn').addEventListener('click', () => {
      removeAuthDialog();
    });
    
    authDialog.addEventListener('click', (e) => {
      if (e.target === authDialog) {
        removeAuthDialog();
      }
    });
  };

  return (
    <section id="rewards" className="py-20 bg-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Redeem Your Points
        </h2>
        <p className="text-gray-600 mb-10">
          Turn your recycling efforts into real rewards with our partner brands
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {rewards.map(
            ({
              id,
              name,
              description,
              points,
              value,
              bg,
              icon: Icon,
              color,
            }) => (
              <div
                key={id}
                className={`rounded-lg p-6 text-left shadow-sm ${bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
              >
                <div className="mb-4 flex justify-center">
                  <Icon className="h-10 w-10" style={{ fill: color }} />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600 mb-4">{description}</p>
                <div className="text-[#4CAF50] font-semibold">{points}</div>
                <div className="text-sm text-gray-500">{value}</div>
              </div>
            )
          )}
        </div>

        <button 
          onClick={handleRewardsClick}
          className="bg-[#4CAF50] text-white px-6 py-2 rounded hover:bg-opacity-90 transition font-medium"
        >
          Browse Rewards
        </button>
      </div>
    </section>
  );
};

export default Reward;