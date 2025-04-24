import React from 'react';
import { Star } from 'lucide-react';

const PointsSummary = ({ points, availableRewards }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mr-4">
            <Star size={24} className="text-[#4CAF50]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Your Points</h3>
            <p className="text-2xl font-bold text-[#4CAF50]">{points.toLocaleString()} points</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Available to redeem</p>
          <p className="text-lg font-bold text-[#4CAF50]">
            {availableRewards} rewards
          </p>
        </div>
      </div>
    </div>
  );
};

export default PointsSummary;