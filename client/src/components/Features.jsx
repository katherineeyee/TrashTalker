// src/components/Features.jsx
import React from 'react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      number: "< 30",
      title: "seconds",
      description: "AI Waste Detection"
    },
    {
      number: "100%",
      title: "Eco-Friendly",
      description: "Sustainable Solutions"
    },
    {
      number: "24/7",
      title: "Support",
      description: "Always Here to Help"
    }
  ];

  return (
    <div className="py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            number={feature.number}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;