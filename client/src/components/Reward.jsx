import React from "react";
import { ReactComponent as AmazonIcon } from "../icons/amazon.svg";
import { ReactComponent as SpotifyIcon } from "../icons/spotify.svg";
import { ReactComponent as NetflixIcon } from "../icons/netflix.svg";
import { ReactComponent as UberEatsIcon } from "../icons/ubereats.svg";

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
    value: "$9.99 value",
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

        <button className="bg-[#4CAF50] text-white px-6 py-2 rounded hover:bg-opacity-90 transition font-medium">
          Start Redeeming Rewards
        </button>
      </div>
    </section>
  );
};

export default Reward;
