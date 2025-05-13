import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Batteries = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">BATTERIES</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle batteries.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/battery.png"
          alt="Battery Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Never Throw in the Trash"
        highlights={[""]}
        description="Batteries are banned from the trash because they contain metals and other toxic and corrosive chemicals that can leach into the environment. All batteries, including sizes AAA, AA, C, and D, need to be disposed of as Household Hazardous Waste."
        imageSrc="/batt.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Buy Rechargeable Batteries "
        highlights={[""]}
        description="Most single-use batteries can be replaced by rechargeable ones. Consider switching batteries so you can reduce how much hazardous waste you generate. Today’s rechargeable batteries are even made to have the same battery life as single-use ones.Turn off battery-powered devices when not in use and avoid exposing electronics to cold conditions to get as much use possible from batteries."
        imageSrc="/rechargeable.png"
      />
      </div>

    </div>
  </div>
  );
};

export default Batteries;