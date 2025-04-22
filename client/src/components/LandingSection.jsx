import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const LandingSection = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const commonMaterials = [
    { id: 1, name: "Glass" },
    { id: 2, name: "Plastic" },
    { id: 3, name: "Compost" },
    { id: 4, name: "Metal" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Rubber" },
    { id: 7, name: "Paper" },
    { id: 8, name: "Batteries" },
  ];

  const handleMaterialSelect = (event) => {
    const materialName = event.target.value;
    if (materialName) {
      navigate(`/${materialName}`);
    }
  };

  // Function to scroll to the signup section
  const handleSignUpScroll = () => {
    // First check if the signup section exists
    const signupSection = document.getElementById("signup");
    
    if (signupSection) {
      // If it exists, scroll to it
      signupSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
      
      // Set URL parameter to show signup mode
      setTimeout(() => {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('signup', 'true');
        window.history.replaceState({}, '', newUrl);
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('popstate'));
      }, 100);
    } else {
      // If the section doesn't exist on the current page, navigate to home with signup hash
      navigate('/#signup');
    }
  };

  // Show search area and position it in view
  const handleLearnMore = () => {
    // show the search section if it's not already visible
    if (!showSearch) {
      setShowSearch(true);
    }

    //  scroll to the search
    document.getElementById("search-heading")?.scrollIntoView({
      behavior: "smooth",
      block: "start", // Positions the element
    });
  };

  return (
    <div className="bg-gray-50">
      <div id="home" className="container mx-auto px-6 py-16">
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
                onClick={handleSignUpScroll}
                className="bg-[#4CAF50] text-white px-8 py-3 rounded-md whitespace-nowrap hover:bg-opacity-90 transition text-lg font-medium text-center"
              >
                Sign Up Free
              </button>
              <button
                onClick={handleLearnMore}
                className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-md whitespace-nowrap hover:bg-gray-50 transition text-lg font-medium text-center"
              >
                Learn More
              </button>
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
          </div>
        </div>

        {/* Search Section - will show when Learn More is clicked */}
        {showSearch && (
          <div className="mt-12 mb-10 pt-8 pb-10 bg-gray-100 rounded-lg shadow-inner">
            <div className="text-center mb-8">
              <h2
                id="search-heading"
                className="text-3xl font-bold text-gray-800 mb-4 pt-4"
              >
                What Would You Like to Recycle?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Search for items or upload a photo for instant identification
                and recycling instructions.
              </p>
            </div>
            <SearchBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingSection;