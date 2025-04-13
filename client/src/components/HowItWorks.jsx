import React from "react";
import { Scan, Coins, BarChart3, HandCoins } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Scan size={32} className="text-green-600" />,
      title: "1. Scan Item",
      description:
        "Use your camera to scan any recyclable item and get instant identification",
    },
    {
      icon: <Coins size={32} className="text-green-600" />,
      title: "2. Earn Points",
      description:
        "Get points for each correctly recycled item based on material type and weight",
    },
    {
      icon: <BarChart3 size={32} className="text-green-600" />,
      title: "3. Compete",
      description:
        "Check your ranking on local and global leaderboards and earn achievements",
    },
    {
      icon: <HandCoins size={32} className="text-green-600" />,
      title: "4. Redeem",
      description:
        "Exchange your points for gift cards and other eco-friendly rewards",
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How TrashTalker Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four simple steps to turn your recycling habits into rewards
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
