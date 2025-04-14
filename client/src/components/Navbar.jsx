import React, { useState, useEffect } from "react";
import { logout, onUserStateChange } from "../api/firebase";

const Navbar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogout = () => {
    logout().then(() => setUser(null));
  };

  return (
    <>
      {/* Spacer div to prevent content from being hidden under navbar */}
      <div className="h-20"></div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-2 px-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/">
            <img
              src="/TrashTalkerLogo.png"
              alt="TrashTalker Logo"
              className="h-16"
            />
          </a>

          {/* Navigation links */}
          <div id="navbar" className="flex items-center space-x-8">
            <a
              href="#features"
              className="text-[#4CAF50] font-medium hover:text-[#3d8b40] transition"
            >
              Features
            </a>
            <a
              href="#gamification"
              className="text-gray-700 hover:text-[#4CAF50] transition"
            >
              Gamification
            </a>
            <a
              href="#rewards"
              className="text-gray-700 hover:text-[#4CAF50] transition"
            >
              Rewards
            </a>

            {!user ? (
              <>
                <a
                  href="#signup"
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-md whitespace-nowrap hover:bg-opacity-90 transition inline-block text-center"
                >
                  Log In
                </a>
                <a
                  href="#signup"
                  className="border border-[#4CAF50] text-[#4CAF50] px-6 py-2 rounded-md whitespace-nowrap hover:bg-[#4CAF50] hover:bg-opacity-10 transition inline-block text-center"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#4CAF50] text-white px-6 py-2 rounded-md whitespace-nowrap hover:bg-opacity-90 transition"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
