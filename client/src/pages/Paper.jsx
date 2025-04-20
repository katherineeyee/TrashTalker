import React from "react";
import Navbar from '../components/Navbar';
import WasteInfoCard from '../components/WasteInfoCard';
import './PageStyles.css';  // Import the CSS file for styling


const Paper = () => {
  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto">

    <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 gap-8">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold text-[#007f3f] mb-2">PAPER</h1>
        
        <p className="text-xl text-gray-600 mb-8">Tips and tricks on how to recycle paper products.</p>
        
      </div>
      
      <div className="w-[28%] h-[28%]">
        <img 
          src="/paperImage.png"
          alt="Paper Illustration"
          className="w-full object-contain"
        />
      </div>
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="Construction Paper "
        highlights={[""]}
        description="Recycle clean paper. Staples and tape are OK. Do not recycle paper that has foil or grease/food residue.

Sometimes small bits of paper cannot be recycled because they get lost in the recycling process. In general, try to recycle everything receipt-sized or larger. Shredded paper should be sealed in a clear bag and recycled.  "
        imageSrc="/images/paper.png"
      />
    </div>

    <div className="p-10">
      <WasteInfoCard
        title="No Glitter & Glue "
        highlights={[""]}
        description="A piece of construction paper that’s covered with lots of glitter, glue, and/or paint contains too many contaminants to go through the paper recycling process."
        imageSrc="/images/pyrex.png"
      />
      </div>

      <div className="p-10">
      <WasteInfoCard
        title="How Small Is Too Small?"
        highlights={[""]}
        description="Sometimes small bits of paper cannot be recycled because they get lost in the recycling process. In general, try to recycle everything receipt-sized or larger. Shredded paper is too small and should be thrown away."
        imageSrc="/images/pyrex.png"
      />
      </div>

      <div className="p-10">
      <WasteInfoCard
        title="Use Shredded Paper as Packing Material"
        highlights={[""]}
        description="Shipping out something fragile? Reuse your shredded paper as packing material to protect items during shipping."
      />
      </div>

    </div>
  </div>
  );
};

export default Paper;