// component for stats card
const StatCard = ({ icon: IconComponent, label, value, bgColor, textColor }) => (
    <div className={`${bgColor} p-4 rounded-lg hover:${bgColor.replace('10', '20')} transition cursor-default`}>
      <div className="flex items-center gap-2 mb-2">
        <IconComponent size={25} className={textColor} />
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <p className="text-3xl font-bold" style={{ color: textColor.includes('-') ? undefined : textColor }}>
        {value}
      </p>
    </div>
  );

  export default StatCard;