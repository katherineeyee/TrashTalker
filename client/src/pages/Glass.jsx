import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Glass = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">GLASS</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle glass products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/glassImage.png"
          alt="Glass Illustraion" 
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Recycle ONLY broken "
        highlights={["BOTTLES and JARS."]}
        description="Broken porcelain, ceramics, Pyrex, glassware, window glass, picture frame glass, and mirror glass go in the garbage cart.  Broken light bulbs should be put in puncture-proof containers and taken to the HHW drop-off facility (Household Hazardous Waste).  

Place small broken glass or ceramic items in a small plastic bag or wrap them in newspaper. Put large pieces of broken glass or ceramics inside two layers of plastic bags. Large pieces that are in tact should be taken to the landfill."
        imageSrc="/images/broken-glass.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Do NOT recycle broken  "
        highlights={["DRINK GLASSES and PYREX."]}
        description="Broken stemware, other drink glasses, porcelain, and Pyrex cannot be recycled. These types of glass are made from mixed materials that will contaminate the glass recycling process for bottles and jars."
        imageSrc="/images/pyrex.png"
      />
      </div>

    </div>
  </div>
  );
};

export default Glass;