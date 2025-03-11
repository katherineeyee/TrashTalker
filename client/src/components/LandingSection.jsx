import React from 'react';
import { Link } from 'react-router-dom';

const LandingSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">Smart.</h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">Efficient.</h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">Eco-Friendly.</h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-10">TrashTalker.</h1>
        
        <p className="text-xl text-gray-600 mb-8">Your Smart Waste Management Solution.</p>
        
        <Link to="/get-started" className="bg-[#007f3f] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#006835] inline-block">
          Get Started
        </Link>
      </div>
      
      <div className="w-full md:w-1/3">
        <img 
          src="/api/placeholder/400/320" 
          alt="Recycling Illustration" 
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default LandingSection;