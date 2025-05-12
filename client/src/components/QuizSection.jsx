import React, { useEffect, useState } from "react";
import { onUserStateChange } from "../api/firebase";
import { Recycle, Trash2, Sprout } from "lucide-react";

// Icons for each bin type
const BIN_ICONS = {
  Recycle: { icon: Recycle, color: "text-green-600" },
  Compost: { icon: Sprout, color: "text-amber-600" },
  Landfill: { icon: Trash2, color: "text-gray-600" },
};

// Simple function to convert material categories to disposal bins
const getBinForMaterial = (category) => {
  // These are the recyclable materials
  if (["Plastic", "Glass", "Metal", "Paper"].includes(category)) {
    return "Recycle";
  }

  // These are compostable materials
  if (["Compost", "Food", "Organic"].includes(category)) {
    return "Compost";
  }

  // Everything else goes to landfill by default
  return "Landfill";
};

const QuizSection = ({ objectName, subCategory, mainCategory, onNext }) => {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [correctBin, setCorrectBin] = useState("");

  // Options for the quiz
  const options = ["Recycle", "Compost", "Landfill"];

  // Get user from firebase
  useEffect(() => {
    onUserStateChange(setAuthUser);
  }, []);

  // Set correct bin when mainCategory changes
  useEffect(() => {
    if (mainCategory) {
      setCorrectBin(getBinForMaterial(mainCategory));
      console.log(
        `Material: ${mainCategory} → Bin: ${getBinForMaterial(mainCategory)}`
      );
    }
  }, [mainCategory]);

  const handleSelect = async (option) => {
    if (isAnswered) return;

    setSelected(option);
    setIsAnswered(true);

    const email = authUser?.email;
    const isCorrect = option === correctBin;

    try {
      // Save quiz result
      await fetch("http://localhost:5001/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: email || "000000000000000000000000",
          imageId: "image-" + Math.random().toString(36).substr(2, 9),
          object: objectName,
          subCategory: subCategory,
          mainCategory: mainCategory,
          userAnswer: option,
          isCorrect,
          rewardGiven: isCorrect,
        }),
      });

      // Award points if correct and user is logged in
      if (isCorrect && email) {
        try {
          await fetch(
            `http://localhost:5001/api/users/${encodeURIComponent(
              email
            )}/points?numPoints=50`,
            {
              method: "PUT",
            }
          );
        } catch (error) {
          console.error("Error adding user points:", error);
        }
      }
    } catch (err) {
      console.error("Error saving quiz result:", err);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow-md max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Where should we throw out{" "}
        <span className="text-blue-600 font-bold">{subCategory}</span>?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const { icon: Icon, color } = BIN_ICONS[option];
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`p-3 rounded-lg border text-white font-semibold transition flex flex-col items-center ${
                isAnswered
                  ? option === correctBin
                    ? "bg-green-500" // Correct answer
                    : option === selected
                    ? "bg-red-500" // Wrong answer
                    : "bg-gray-300" // Other options
                  : "bg-blue-500 hover:bg-blue-600" // Not answered yet
              }`}
              disabled={isAnswered}
            >
              <Icon
                size={24}
                className={`mb-2 ${isAnswered ? "text-white" : color}`}
              />
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-4 text-center">
          {selected === correctBin ? (
            <p className="text-green-600 font-bold text-lg">
              🎉 Congratulations! You get 50 points!
            </p>
          ) : (
            <p className="text-red-600 font-bold text-lg">
              ❌ The answer is <span className="underline">{correctBin}</span>.
            </p>
          )}
          <button
            onClick={onNext}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Next Questions →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
