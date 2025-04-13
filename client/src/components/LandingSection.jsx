import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/firebase"; // Import your existing Firebase login function

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

  // Function to handle Google sign up/login
  const handleGoogleSignUp = async () => {
    try {
      const user = await login(); // Using your existing Firebase login function
      if (user) {
        // Redirect to dashboard or home page after successful login
        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div
      id="
    "
      className="bg-gray-50 py-16"
    >
      <div id="home" className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left column with text content */}
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Turn Recycling into Rewards with TrashTalker
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Our advanced image detection technology identifies recyclable
              items instantly, helping you recycle correctly while earning
              points and rewards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleGoogleSignUp}
                className="bg-[#4CAF50] text-white px-8 py-3 rounded-md whitespace-nowrap hover:bg-opacity-90 transition text-lg font-medium text-center"
              >
                Sign Up Free
              </button>
              <Link
                to="/learn-more"
                className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-md whitespace-nowrap hover:bg-gray-50 transition text-lg font-medium text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Material dropdown section */}
            <div>
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
          <div className="w-full md:w-1/2 flex md:justify-end">
            <img
              src="/girl3.png"
              alt="Recycling Illustration"
              className="w-full object-contain"
            />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
