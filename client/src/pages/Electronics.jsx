import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Electronics = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">ELECTRONICS</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle electronic products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/electric.png"
          alt="Electronic Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="SMALL APPLIANCES "
        highlights={[""]}
        description="If your appliance is in good condition, consider donating it.

For items that cannot be donated, make a free Junk Pickup appointment for the following appliances:
Air conditioning unit, air purifier, blender, chainsaw, clothes dryer, coffeemaker, cooktop/stove/range, dehumidifier, dishwasher, freezer, generator, heater/space heater, hedge/edge/grass trimmer, iron, lawn mower, motors (of any kind), other tools or equipment, power tools/equipment (indoor/outdoor), pressure washer, refrigerator, steam iron, toaster, vacuum cleaner, waffle iron, washing machine.

The above appliances cannot be disposed of as hazardous waste or e-waste."
        imageSrc="/images/electronic_appliance.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Never Throw in the Garbage  "
        highlights={[""]}
        description="Small appliances are made from dangerous materials, such as freon, chlorofluorocarbons and mercury. Don’t throw them away because they can leach toxic chemicals into the environment."
        imageSrc="/images/hazard.png"
      />
      </div>

    </div>
  </div>
  );
};

export default Electronics;