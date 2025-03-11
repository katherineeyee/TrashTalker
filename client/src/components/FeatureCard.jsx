import React from 'react';

const FeatureCard = ({ number, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <h2 className="text-5xl font-bold text-[#007f3f] mb-2">{number}</h2>
      <h3 className="text-[#007f3f] text-xl mb-4">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default FeatureCard;