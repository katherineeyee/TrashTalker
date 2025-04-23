// component for point system item
const PointSystemItem = ({ Icon, label, pts, bg, text }) => (
    <div 
      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition cursor-default focus:outline-none"
      tabIndex={0}
    >
      <div className="flex items-center">
        <div className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center`}>
          <Icon size={18} className={text} />
        </div>
        <span className="ml-3 text-gray-700">{label}</span>
      </div>
      <span className="font-medium text-gray-800">
        {pts} points
      </span>
    </div>
  );

export default PointSystemItem;