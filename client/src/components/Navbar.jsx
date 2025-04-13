import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login, logout, onUserStateChange } from "../api/firebase";

const Navbar = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then((user) => setUser(user));
  };

  const handleLogout = () => {
    logout().then(() => setUser(null));
  };

  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src="/TrashTalkerLogo.png"
            alt="TrashTalker Logo"
            className="h-16"
          />
        </Link>

        {/* Navigation links  */}
        <div id="navbar" className="flex items-center space-x-8">
          <Link
            to="/features"
            className="text-[#4CAF50] font-medium hover:text-[#3d8b40] transition"
          >
            Features
          </Link>
          <Link
            to="/how-it-works"
            className="text-gray-700 hover:text-[#4CAF50] transition"
          >
            Gamification
          </Link>
          <Link
            to="/rewards"
            className="text-gray-700 hover:text-[#4CAF50] transition"
          >
            Rewards
          </Link>

          {!user ? (
            <>
              <button
                onClick={handleLogin}
                className="bg-[#4CAF50] text-white px-6 py-2 rounded-md whitespace-nowrap hover:bg-opacity-90 transition"
              >
                Log In
              </button>
              <button
                onClick={handleLogin}
                className="border border-[#4CAF50] text-[#4CAF50] px-6 py-2 rounded-md whitespace-nowrap hover:bg-[#4CAF50] hover:bg-opacity-10 transition"
              >
                Sign Up
              </button>
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
  );
};

export default Navbar;
