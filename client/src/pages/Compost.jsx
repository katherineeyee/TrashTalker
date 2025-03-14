import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';

const Compost = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">COMPOSTABLE PRODUCTS</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle compostable cups, plates and utensils.</p>
        
      </div>
      
      <div className="w-full md:w-1/3">
        <img 
          src="/api/placeholder/400/320" 
          alt="Compost Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Do NOT compost them at home. "
        highlights={["BOTTLES and JARS."]}
        description="Bioplastic doesn’t belong in your home compost pile, regardless of whether it’s biodegradable or compostable. Utensils made from bioplastic won’t break down fully unless processed by an industrial facility."
        imageSrc="/images/compostable.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="BPI Logo?"
        highlights={["Compost Industrially."]}
        description="If you see the plastic item is marked with the BPI logo, that means it’s compostable in an industrial facility."
        imageSrc="/images/BPI_logo.png"
      />
    </div>

    </div>
  </div>
  );
};

export default Compost;