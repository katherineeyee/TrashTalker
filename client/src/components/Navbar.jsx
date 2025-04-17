import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, onUserStateChange } from "../api/firebase";

const Navbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  useEffect(() => {
    if (location.hash) {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const navigateToSection = (sectionId) => {
    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <div className="h-20"></div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">

            <img
              src="/TrashTalkerLogo.png"
              alt="TrashTalker Logo"
              className="h-16"
            />
          </Link>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigateToSection("features")}
              className="text-[#4CAF50] font-medium hover:text-[#3d8b40] transition"
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection("gamification")}
              className="text-gray-700 hover:text-[#4CAF50] transition"
            >
              Gamification
            </button>
            <button
              onClick={() => navigateToSection("rewards")}
              className="text-gray-700 hover:text-[#4CAF50] transition"
            >
              Rewards
            </button>

            {!user ? (
              <>
                <button
                  onClick={() => navigateToSection("signup")}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigateToSection("signup")}
                  className="border border-[#4CAF50] text-[#4CAF50] px-6 py-2 rounded-md hover:bg-opacity-10 hover:bg-[#4CAF50] transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => logout().then(() => setUser(null))}
                className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
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
