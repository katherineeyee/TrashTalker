import React from 'react';
import { Zap, Gift, Star } from 'lucide-react';

const EarnPointsSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Earn More Points</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Zap size={20} className="text-blue-600 mr-2" />
            <h4 className="font-medium text-gray-800">Scan Items</h4>
          </div>
          <p className="text-sm text-gray-600">
            Scan your recyclable items to earn points instantly.
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Gift size={20} className="text-green-600 mr-2" />
            <h4 className="font-medium text-gray-800">Daily Check-ins</h4>
          </div>
          <p className="text-sm text-gray-600">
            Check in daily to maintain your streak and earn bonus points.
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Star size={20} className="text-purple-600 mr-2" />
            <h4 className="font-medium text-gray-800">Refer Friends</h4>
          </div>
          <p className="text-sm text-gray-600">
            Get 500 points for each friend who joins and recycles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarnPointsSection;