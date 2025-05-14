import React, { useState } from "react";
import { Trash2, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = ({ user }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // toggle for logged-in user
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubscribe = () => {
    if (user) {
      // Toggle logic for authenticated user
      const newStatus = !isSubscribed;
      setIsSubscribed(newStatus);
      setPopupMessage(newStatus ? "You are subscribed!" : "You unsubscribed.");
      setShowPopup(true);
    } else if (email.trim()) {
      // For guest user
      setPopupMessage("Thank you for subscribing!");
      setShowPopup(true);
      setEmail("");
    }

    // Hide popup after 3s
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <footer className="bg-gray-800 text-white py-12 px-4 relative">
      {/* ✅ Popup Message */}
      {showPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>{popupMessage}</span>
        </div>
      )}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Link
                to="/"
                className="flex items-center hover:text-green-400 transition"
              >
                <Trash2 className="text-green-400 h-6 w-6" />
                <span className="ml-2 text-xl font-bold">Trashtalker</span>
              </Link>
            </div>
            <p className="text-gray-400">
              Smart Recycling
              <br />
              Solution for a<br />
              Sustainable Future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="#features" className="hover:text-green-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-green-400 transition"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#game" className="hover:text-green-400 transition">
                  Gamification
                </a>
              </li>
              <li>
                <a href="#rewards" className="hover:text-green-400 transition">
                  Rewards
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/contact" className="hover:text-green-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-green-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-green-400 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get the latest updates
              <br />
              on recycling tips and rewards.
            </p>
            <div className="flex mt-2">
              {!user && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-gray-700 rounded-l-lg px-4 py-2 w-full text-white focus:outline-none"
                />
              )}
              <button
                onClick={handleSubscribe}
                className={`${
                  user ? "rounded-lg" : "rounded-r-lg"
                } bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition`}
              >
                {user ? (
                  isSubscribed ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </button>
            </div>
            {user && (
              <p className="text-sm text-gray-400 mt-2">
                {isSubscribed
                  ? "You're subscribed."
                  : "You're not subscribed yet."}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
          <p>© 2025 Trashtalker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
