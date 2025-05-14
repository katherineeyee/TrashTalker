import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';

const Plastic = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">PLASTIC</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle plastic products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/plasticImage.png"
          alt="Plastic Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Plastic #1 "
        highlights={["PET"]}
        description="If a container once held food, empty and scrape the container as well as you can before recycling it. Containers with food and liquids can contaminate whole batches of recycling and are often sent to a landfill.

If the container has a plastic lid or cap, it’s okay to recycle the caps and lids as long as they are still attached to their original plastic containers."
        imageSrc="/pet_plastic.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title=""
        highlights={["Not Safe to Reuse."]}
        description="PET plastic has a porous structure that absorbs bacteria over time and becomes more porous with each use. Because germs can reside inside the plastic, you can’t always wash them away."
        imageSrc="/safety_logo.png"
      />
    </div>
      
    </div>
  </div>
  );
};

export default Plastic;