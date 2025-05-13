import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Metal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">METAL</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle metal products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/metal.png"
          alt="Metal Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Put in Recycling Cart/Bin:  "
        highlights={["ALUMINIUM CANS"]}
        description="Empty any residue before recycling.  Unlike plastic beverage containers, aluminum does not degrade as it’s recycled so aluminum containers can be recycled over and over again. So when you have a choice, choose beverages in aluminum cans.  "
        imageSrc="/cans.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Do NOT crush  "
        highlights={[""]}
        description="You do not need to flatten or crush beverage containers. If you’re using an automated reverse vending machine (RVM), keep the containers as they are, so the machine can recognize the container type. If you are weighing them, they can be brought in whole or flattened."
        imageSrc="/crushed.png"
      />
      </div>

    </div>
  </div>
  );
};

export default Metal;