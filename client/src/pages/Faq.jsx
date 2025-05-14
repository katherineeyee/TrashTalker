import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Faq = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const faqItems = [
    {
      id: 1,
      question: "How do I earn points by recycling?",
      answer:
        "You earn 10 points for each item you correctly sort in the recycling quiz. Additional points can be earned through maintaining daily streaks and completing special challenges.",
    },

    {
      id: 2,
      question: "How do I know which bin to use for recycling?",
      answer:
        "The app provides guidance on which items go into each bin. The Recycle bin is for paper, glass, plastic, and metal. The Compost bin is for food scraps and yard waste. The Landfill bin is for non-recyclable and non-compostable items.",
    },
    {
      id: 3,
      question: "Can I see how my recycling efforts compare to others?",
      answer:
        "Yes! The leaderboard shows how your recycling efforts stack up against other users. You can view the top recyclers and see your ranking. Sign in to access the full leaderboard features.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {faqItems.map((item) => (
          <div key={item.id} className="border-b last:border-b-0">
            <button
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50"
              onClick={() => toggleQuestion(item.id)}
            >
              <h3 className="font-medium text-gray-800">{item.question}</h3>
              {expandedId === item.id ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedId === item.id && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-green-50 p-4 rounded-lg text-center">
        <p className="text-gray-700">
          Still have questions?
          <a
            href="/contact"
            className="text-green-600 font-medium ml-1 hover:underline"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default Faq;
