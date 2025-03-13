import React from "react";
import { Trash2, Users, Bell, Leaf, Check } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              {/* Link to Homepage */}
              <Link
                to="/"
                className="flex items-center hover:text-green-400 transition"
              >
                <Trash2 className="text-green-400 h-6 w-6" />
                <span className="ml-2 text-xl font-bold">Trashtalker</span>
              </Link>
            </div>
            <p className="text-gray-400">
              Smart Recycling Solution for a Sustainable Future.
            </p>
          </div>

          {/* Features Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/features"
                  className="hover:text-green-400 transition"
                >
                  AI Waste Detection
                </Link>
              </li>
              <li>
                <Link
                  to="/streak-board"
                  className="hover:text-green-400 transition"
                >
                  Streak Board
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="hover:text-green-400 transition">
                  Rewards System
                </Link>
              </li>
              <li>
                <Link
                  to="/activity-tracking"
                  className="hover:text-green-400 transition"
                >
                  Activity Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-green-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/mission" className="hover:text-green-400 transition">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="hover:text-green-400 transition"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay Connected Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://example.com/community"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition"
              >
                <Users className="h-5 w-5" />
              </a>
              <a
                href="https://example.com/notifications"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition"
              >
                <Bell className="h-5 w-5" />
              </a>
              <a
                href="https://example.com/sustainability"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition"
              >
                <Leaf className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400">Subscribe to our newsletter</p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-700 rounded-l-lg px-4 py-2 w-full text-white"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition">
                <Check className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>© 2025 Trashtalker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
