import React from "react";

const WasteInfoCard = ({ title, highlights, description, imageSrc }) => {
  return (
    <div className="flex items-center bg-gray-100 p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      {/* Text Section */}
      <div className="w-2/3 p-4">
        <p className="text-gray-700">
          <strong>{title}</strong>{" "}
          {highlights.map((word, index) => (
            <span key={index} className="text-[#007f3f]-600 font-semibold">
              {word}
            </span>
          ))}
        </p>
        <p className="mt-2 text-gray-700">{description}</p>
      </div>

      {/* Image Section */}
      <div className="w-1/3 flex justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="rounded-full w-48 h-48 object-cover"
        />
      </div>
    </div>
  );
};

export default WasteInfoCard;
