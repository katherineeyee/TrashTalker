// component for quick action button
const QuickActionButton = ({ icon: IconComponent, label, onClick, bgColor, iconColor }) => (
    <button 
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      <div className={`${bgColor} p-3 rounded-full mb-3`}>
        <IconComponent size={24} className={iconColor} />
      </div>
      <span className="font-medium text-gray-800">{label}</span>
    </button>
  );

export default QuickActionButton;