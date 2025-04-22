import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, onUserStateChange, login } from "../api/firebase";

const Navbar = () => {
  const [user, setUser] = useState();
  const [activeSection, setActiveSection] = useState("features");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.slice(1);
      setActiveSection(section);
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname === "/") {
      // Scroll to top when navigating to home without hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId);

    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const goToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
  };

  const navButtonClass = (section) =>
    `font-medium transition ${
      activeSection === section
        ? "text-[#4CAF50]"
        : "text-gray-700 hover:text-[#4CAF50]"
    }`;
  
  const handleDirectLogin = () => {
    login().then((currentUser) => setUser(currentUser));
  };

  const navigateToSignup = () => {
    navigateToSection("signup");
    setTimeout(() => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('signup', 'true');
      window.history.replaceState({}, '', newUrl);
      window.dispatchEvent(new Event('popstate'));
    }, 100);
  };

  return (
    <>
      <div className="h-20"></div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <button onClick={goToHome} className="focus:outline-none">
            <img
              src="/TrashTalkerLogo.png"
              alt="TrashTalker Logo"
              className="h-16"
            />
          </button>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => navigateToSection("features")}
              className={navButtonClass("features")}
            >
              Features
            </button>
            <button
              onClick={() => navigateToSection("gamification")}
              className={navButtonClass("gamification")}
            >
              Gamification
            </button>
            <button
              onClick={() => navigateToSection("rewards")}
              className={navButtonClass("rewards")}
            >
              Rewards
            </button>

            {!user ? (
              <>
                <button
                  onClick={handleDirectLogin}
                  className="bg-[#4CAF50] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition"
                >
                  Log In
                </button>
                <button
                  onClick={navigateToSignup}
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