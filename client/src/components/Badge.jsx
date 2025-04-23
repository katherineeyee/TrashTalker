// component for badge section
import React from 'react';
import { CheckCircle } from 'lucide-react';

const Badge = ({ badge, achieved }) => (
  <div 
    className={`flex flex-col items-center p-3 rounded-lg ${achieved ? badge.bg : 'bg-gray-100'} 
    hover:scale-105 transition-transform cursor-default focus:outline-none`}
    tabIndex={0}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 
      ${achieved ? 'bg-white' : 'bg-gray-200'} ${achieved ? badge.ring : ''}`}>
      <badge.Icon size={20} className={achieved ? badge.text : 'text-gray-400'} />
    </div>
    <p className={`text-sm text-center font-medium ${achieved ? 'text-gray-800' : 'text-gray-500'}`}>
      {badge.name}
    </p>
    {achieved && (
      <span className="mt-1 inline-flex items-center text-xs text-[#4CAF50]">
        <CheckCircle size={12} className="mr-1" />
        Earned
      </span>
    )}
  </div>
);

export default Badge;