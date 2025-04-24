import React from 'react';

const RewardCard = ({ reward, userPoints, onRedeem }) => {
  const canRedeem = userPoints >= reward.points;
  const Icon = reward.icon;
  
  return (
    <div
      className={`rounded-lg p-6 text-left shadow-sm ${reward.bg} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border ${
        canRedeem ? 'border-transparent' : 'border-gray-200 opacity-80'
      }`}
    >
      <div className="mb-4 flex justify-center">
        <Icon className="h-10 w-10" style={{ fill: reward.color }} />
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{reward.name}</h3>
      <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-[#4CAF50] font-semibold">
            {reward.points.toLocaleString()} points
          </div>
          <div className="text-sm text-gray-500">{reward.value}</div>
        </div>
        {canRedeem ? (
          <button
            onClick={() => onRedeem(reward)}
            className="bg-[#4CAF50] text-white px-4 py-2 rounded text-sm hover:bg-opacity-90 transition font-medium"
          >
            Redeem
          </button>
        ) : (
          <div className="text-sm text-gray-500">
            Need {reward.points - userPoints} more
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardCard;