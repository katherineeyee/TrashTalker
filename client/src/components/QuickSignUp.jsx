import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { login, onUserStateChange } from "../api/firebase";
import { useLocation, useNavigate } from "react-router-dom";

const QuickSignUp = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const autoLogin = urlParams.get("autologin");

    onUserStateChange((currentUser) => {
      setUser(currentUser);
      if (autoLogin === "true" && !currentUser) {
        handleGoogleAuth();
      }
    });
  }, [location]);

  // Handle login/signup toggle based on URL
  useEffect(() => {
    if (location.search.includes("signup") || location.hash === "#signup") {
      setIsLogin(false);
    } else if (
      location.search.includes("login") ||
      location.hash === "#login"
    ) {
      setIsLogin(true);
    }
  }, [location]);

  // Google login trigger
  const handleGoogleAuth = () => {
    login().then((currentUser) => setUser(currentUser));
  };

  return (
    <section id="signup" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Auth */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {isLogin ? "Log In to TrashTalker" : "Join TrashTalker Today"}
              </h2>

              {user ? (
                <div className="text-center">
                  <p className="text-lg text-gray-800 mb-4">Welcome back!</p>
                  <p className="text-gray-600 mb-6">
                    You're logged in and ready to start earning rewards for
                    recycling.
                  </p>
                  <button
                    onClick={() => navigate("/features")}
                    className="bg-[#4CAF50] text-white px-6 py-2 rounded-md inline-block hover:bg-opacity-90 transition"
                  >
                    Explore Features
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-full max-w-sm">
                    <p className="text-center text-gray-600 mb-6">
                      {isLogin
                        ? "Sign in with your Google account to access your recycling progress."
                        : "Create an account with Google to start tracking your recycling journey."}
                    </p>

                    <button
                      onClick={handleGoogleAuth}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition mb-6"
                    >
                      <FcGoogle size={24} />
                      <span className="font-medium text-gray-700">
                        {isLogin
                          ? "Sign in with Google"
                          : "Sign up with Google"}
                      </span>
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      {isLogin
                        ? "Don't have an account yet?"
                        : "Already have an account?"}
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-[#4CAF50] hover:underline focus:outline-none"
                      >
                        {isLogin ? "Sign Up" : "Log In"}
                      </button>
                    </p>
                  </div>

                  <div className="w-full max-w-sm mt-8 p-4 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600 text-center">
                      By continuing, you agree to our Terms of Service and
                      Privacy Policy. Your data is secure with us.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Right: Benefits */}
            <div className="bg-[#4CAF50]/10 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Benefits of Joining
              </h3>
              <ul className="space-y-4">
                {[
                  "Track your recycling impact with detailed statistics",
                  "Compete with friends and your community",
                  "Earn points and redeem for valuable rewards",
                  "Learn proper recycling techniques and guidelines",
                  "Receive personalized tips to improve your recycling habits",
                ].map((text, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5">
                      <Check size={18} className="text-[#4CAF50]" />
                    </div>
                    <span className="ml-3 text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-white rounded">
                <p className="text-sm text-gray-600">
                  Your data is secure with us. We use industry-standard
                  encryption to protect your information and never share it with
                  third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSignUp;
