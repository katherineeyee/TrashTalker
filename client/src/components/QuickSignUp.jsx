import React from "react";
import { Check } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const QuickSignUp = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Form */}
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Join TrashTalker Today
              </h2>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4CAF50] text-white py-2 rounded hover:bg-opacity-90 transition font-medium"
                >
                  Login
                </button>
              </form>

              {/* Google Only */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">Or sign up with</p>
                <div className="flex justify-center">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                    <FcGoogle size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      Sign up with Google
                    </span>
                  </button>
                </div>
              </div>
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
