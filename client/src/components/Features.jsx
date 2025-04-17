import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: "camera",
      title: "Image Detection Technology",
      description:
        "Our AI-powered system instantly identifies recyclable items through your camera, providing immediate feedback on recyclability and proper disposal methods.",
    },
    {
      icon: "gamepad",
      title: "Gamification System",
      description:
        "Earn points, unlock achievements, and climb the leaderboard as you recycle. Compete with friends and your community to make a bigger environmental impact.",
    },
    {
      icon: "gift",
      title: "Reward Program",
      description:
        "Exchange your earned points for real-world rewards including gift cards from popular brands, discounts on eco-friendly products, and more.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Smart Recycling, Real Rewards
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            TrashTalker combines cutting-edge technology with gamification to
            make recycling fun, rewarding, and impactful.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
