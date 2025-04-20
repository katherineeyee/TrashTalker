import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Rubber = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">RUBBER</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle rubber products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/rubberImage.png"
          alt="Rubber Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Rubber Gloves"
        highlights={[""]}
        description="Rubber gloves are made out of a durable material that allows them to be used repeatedly. Latex gloves, on the other hand, are single-use."
        imageSrc="/images/rubber_gloves.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Open Jars More Easily  "
        highlights={[""]}
        description="A clean, worn-out rubber glove can be stashed in a kitchen drawer or under the sink to help open jars that get stuck."
        imageSrc="/images/jars.png"
      />
      </div>
    
      <div className="p-10">
      <WasteInfoCard
        title="Cut Up for Reuse "
        highlights={[""]}
        description="Rubber gloves can be cut up and repurposed as rubber bands or non-slip pads. Non-slip pads can be glued to items such as brooms and mops to keep them from sliding down walls."
        imageSrc="/images/scissors.png"
      />
      </div>

    </div>
  </div>
  );
};

export default Rubber;