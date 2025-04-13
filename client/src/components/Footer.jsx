import React from "react";
import { Trash2, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Description */}
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
                <a href="#home" className="hover:text-green-400 transition">
                  Home
                </a>
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
                <a
                  href="#gamification"
                  className="hover:text-green-400 transition"
                >
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
                <Link to="/help" className="hover:text-green-400 transition">
                  Help Center
                </Link>
              </li>
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
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 rounded-l-lg px-4 py-2 w-full text-white focus:outline-none"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition">
                <Check className="h-5 w-5" />
              </button>
            </div>
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
