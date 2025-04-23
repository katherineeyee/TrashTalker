// component for reward item
const RewardItem = ({ reward }) => {
    const Icon = reward.icon;
    
    return (
      <div 
        className="flex items-start p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition cursor-default focus:outline-none"
        tabIndex={0}
      >
        <div className={`${reward.bg} p-3 rounded-lg mr-4 flex items-center justify-center`}>
          <Icon className="h-6 w-6" style={{ fill: reward.color }} />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{reward.name}</h4>
          <h4 className="text-xs text-gray-800">{reward.value}</h4>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
            <span className="text-xs font-medium bg-[#4CAF50]/10 text-[#4CAF50] px-2 py-1 rounded-full">
              - {reward.points}
            </span>
          </div>
        </div>
      </div>
    );
  };

export default RewardItem;