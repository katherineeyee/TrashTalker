import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <img 
          src="/TrashTalkerLogo.png"
          alt="TrashTalker Logo"
          className="h-16"
        />
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        <Link to="/login" className="text-gray-700 hover:text-gray-900">Log in</Link>
        <Link 
          to="/signup" 
          className="bg-[#007f3f] text-white px-4 py-2 rounded-md hover:bg-[#006835]"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;