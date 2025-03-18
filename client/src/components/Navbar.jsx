import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';

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
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/TrashTalkerLogo.png"
            alt="TrashTalker Logo"
            className="h-16"
          />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
        
        {!user ? (
          <>
            <button onClick={handleLogin}
              className="text-gray-700 hover:text-gray-900">
              Log in
            </button>

            <button onClick= {handleLogin} 
              className="bg-[#007f3f] text-white px-4 py-2 rounded-md hover:bg-[#006835]">
              Sign up
            </button>
          </>
        ) : (
          <button onClick={handleLogout}
            className="text-gray-700 hover:text-gray-900">
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;