import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onUserStateChange } from '../api/firebase';
import Navbar from "../components/Navbar";

const AccountPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Access</h2>
          <p className="text-gray-600 mb-6">Please log in to view your account details.</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-opacity-90 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />          
    </>
  );
};

export default AccountPage;