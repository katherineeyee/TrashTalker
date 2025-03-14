import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LandingSection = () => {
  const navigate = useNavigate();

  const commonMaterials = [
    { id: 1, name: "Glass" },
    { id: 2, name: "Plastic" },
    { id: 3, name: "Compost" },
  ];

  const handleMaterialSelect = (event) => {
    const materialName = event.target.value;
    if (materialName) {
      navigate(`/${materialName}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">Smart.</h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">Efficient.</h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">
          Eco-Friendly.
        </h1>
        <h1 className="text-5xl font-bold text-[#007f3f] mb-10">
          TrashTalker.
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your Smart Waste Management Solution.
        </p>

        <Link
          to="/"
          className="bg-[#007f3f] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#006835] inline-block"
        >
          Get Started
        </Link>

        {/* Material dropdown section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">Common Materials</h3>
          <select
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md"
            onChange={handleMaterialSelect}
            defaultValue=""
          >
            <option value="" disabled>
              Select a material
            </option>
            {commonMaterials.map((material) => (
              <option key={material.id} value={material.name}>
                {material.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-[38%] h-[38%]">
        <img
          src="/recycleLogoNB.png"
          alt="Recycling Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default LandingSection;
