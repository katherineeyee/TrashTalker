import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Terms of Service
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4 text-gray-700">
        <section>
          <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
          <p>
            By using our app, you agree to these Terms of Service. Please read
            them carefully before using the app.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">2. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You
            are responsible for keeping your login information secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">3. Use of the App</h2>
          <p>
            You agree to use the app for lawful purposes only. Misuse or
            cheating in the recycling game or leaderboard will result in account
            suspension.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">4. Points and Rewards</h2>
          <p>
            Points earned in the app have no real-world value. We reserve the
            right to change the points system at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">5. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued
            use of the app means you accept any changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">6. Contact</h2>
          <p>
            If you have any questions about these terms, please{" "}
            <a
              href="/contact"
              className="text-green-600 hover:underline font-medium"
            >
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
