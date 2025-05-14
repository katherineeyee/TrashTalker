import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>

      <div className="bg-white p-4 rounded shadow text-gray-700 space-y-4">
        <p>
          We use Firebase for user login and authentication. When you sign in,
          we collect basic info like your email to personalize your experience
          and keep your account secure.
        </p>
        <p>
          Your data is only used within the app to track progress, show rewards,
          and improve features. We do not sell your information.
        </p>
        <p>
          You can request to update or delete your info anytime.{" "}
          <a
            href="/contact"
            className="text-green-600 font-medium hover:underline"
          >
            Contact us
          </a>{" "}
          if you have any questions.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
