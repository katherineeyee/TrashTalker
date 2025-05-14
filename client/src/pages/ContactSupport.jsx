import React from "react";
import { Mail, MessageSquare, Phone, ArrowRight } from "lucide-react";

const ContactSupport = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Support</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Support */}
          <div className="border rounded-lg p-4 text-center hover:border-green-300 hover:bg-green-50 transition">
            <Mail className="h-8 w-8 mx-auto text-green-600 mb-3" />
            <h3 className="font-medium text-gray-800 mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-3">
              support@trashtalker.com
            </p>
            <p className="text-xs text-gray-500">Response within 24 hours</p>
          </div>

          {/* Live Chat */}
          <div className="border rounded-lg p-4 text-center hover:border-green-300 hover:bg-green-50 transition">
            <MessageSquare className="h-8 w-8 mx-auto text-green-600 mb-3" />
            <h3 className="font-medium text-gray-800 mb-2">Live Chat</h3>
            <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Start Chat
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Available 9am-5pm (Mon-Fri)
            </p>
          </div>

          {/* Phone Support */}
          <div className="border rounded-lg p-4 text-center hover:border-green-300 hover:bg-green-50 transition">
            <Phone className="h-8 w-8 mx-auto text-green-600 mb-3" />
            <h3 className="font-medium text-gray-800 mb-2">Phone</h3>
            <p className="text-sm text-gray-600 mb-3">+1 (555) 123-4567</p>
            <p className="text-xs text-gray-500">9am-5pm (Mon-Fri)</p>
          </div>
        </div>
      </div>

      {/* Quick Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Quick Message
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="p-2 border rounded w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <textarea
            placeholder="How can we help you?"
            rows="3"
            className="p-2 border rounded w-full"
            required
          ></textarea>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center ml-auto"
            >
              Send
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* FAQs Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Have a quick question? Check our
          <a
            href="/Faq"
            className="text-green-600 font-medium hover:underline ml-1"
          >
            FAQs
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactSupport;
