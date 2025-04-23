
// Component for user information card
const UserInfoCard = ({ icon: IconComponent, label, value }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-default">
      <IconComponent size={18} className="text-gray-500 mr-3" />
      <div className="text-left">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );

  export default UserInfoCard;