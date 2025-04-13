import React from "react";
import { Camera, Gamepad, Gift } from "lucide-react";

const FeatureCard = ({ icon, title, description }) => {
  const iconSize = 28;
  const getIcon = (iconName) => {
    const iconProps = { size: iconSize, className: "text-green-600" };
    switch (iconName) {
      case "camera":
        return <Camera {...iconProps} />;
      case "gamepad":
        return <Gamepad {...iconProps} />;
      case "gift":
        return <Gift {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="feature-card bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
        {getIcon(icon)}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
