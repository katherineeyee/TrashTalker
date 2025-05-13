import React, { useEffect, useState, useCallback } from "react";
import { onUserStateChange } from "../api/firebase";
import { Recycle, Trash2, Sprout, Info, HelpCircle, Award } from "lucide-react";

// Icon styles for each bin
const BIN_ICONS = {
  Recycle: {
    icon: Recycle,
    color: "text-green-600",
    bg: "bg-green-100",
    hover: "hover:bg-green-200",
  },
  Compost: {
    icon: Sprout,
    color: "text-amber-600",
    bg: "bg-amber-100",
    hover: "hover:bg-amber-200",
  },
  Landfill: {
    icon: Trash2,
    color: "text-gray-600",
    bg: "bg-gray-100",
    hover: "hover:bg-gray-200",
  },
};

export default function QuizSection({
  objectName,
  subCategory,
  mainCategory,
  onNext,
}) {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [correctBin, setCorrectBin] = useState("");
  const [recyclingData, setRecyclingData] = useState(null);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Load user session and saved data
  useEffect(() => {
    onUserStateChange((user) => {
      setAuthUser(user);
      if (user) {
        const s = +localStorage.getItem(`recycling-streak-${user.email}`) || 0;
        const p = +localStorage.getItem(`recycling-points-${user.email}`) || 0;
        setStreak(s);
        setPoints(p);
      }
    });
  }, []);

  // Determine bin logic
  const determineCorrectBin = useCallback(
    (data) => {
      const input = (
        subCategory ||
        mainCategory ||
        objectName ||
        ""
      ).toLowerCase();
      let matched = data.items.find(
        (i) =>
          i.name.toLowerCase() === input || i.category.toLowerCase() === input
      );
      let category = matched?.category;

      if (!category) {
        for (const [cat, keywords] of Object.entries(data.keywords)) {
          if (keywords.some((k) => input.includes(k.toLowerCase()))) {
            category = cat;
            break;
          }
        }
      }

      if (["Glass", "Plastic", "Metal", "Paper"].includes(category))
        setCorrectBin("Recycle");
      else if (category === "Compost") setCorrectBin("Compost");
      else setCorrectBin("Landfill");
    },
    [objectName, subCategory, mainCategory]
  );

  // Load JSON and set bin
  useEffect(() => {
    fetch("/recycling-data.json")
      .then((res) => res.json())
      .then((data) => {
        setRecyclingData(data);
        determineCorrectBin(data);
      });
  }, [determineCorrectBin]);

  useEffect(() => {
    if (recyclingData) determineCorrectBin(recyclingData);
  }, [recyclingData, determineCorrectBin]);

  const handleSelect = async (bin) => {
    if (isAnswered) return;
    setSelected(bin);
    setIsAnswered(true);
    setShowHint(false);

    const isCorrect = bin === correctBin;
    const email = authUser?.email;
    const newStreak = isCorrect ? streak + 1 : 0;
    const earned = isCorrect ? 10 : 0;

    setStreak(newStreak);
    setPoints((prev) => prev + earned);

    if (email) {
      localStorage.setItem(`recycling-streak-${email}`, newStreak);
      localStorage.setItem(`recycling-points-${email}`, points + earned);
    }

    try {
      await fetch("http://localhost:5001/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: email || "000000000000000000000000",
          imageId: "image-" + Math.random().toString(36).slice(2),
          object: objectName,
          subCategory,
          mainCategory,
          userAnswer: bin,
          isCorrect,
          rewardGiven: isCorrect,
          pointsAwarded: earned,
          streak: newStreak,
        }),
      });

      if (isCorrect && email) {
        await fetch(
          `http://localhost:5001/api/users/${encodeURIComponent(
            email
          )}/points?numPoints=${earned}`,
          { method: "PUT" }
        );
      }
    } catch (err) {
      console.error("Error saving quiz:", err);
    }
  };

  const getHint = () =>
    ({
      Recycle: "This can be reused to make new products.",
      Compost: "This is natural material and will break down.",
      Landfill: "This item cannot be reused or composted.",
    }[correctBin] || "Think about what the item is made of.");

  if (!recyclingData) {
    return (
      <div className="p-4 rounded-xl bg-white shadow-md max-w-xl mx-auto mt-6 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto mb-2"></div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-white shadow-md max-w-xl mx-auto mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-700 mr-2">
            Recycling Quiz
          </h2>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Info size={16} />
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-3 bg-yellow-100 px-2 py-1 rounded-md">
            <Award size={16} className="text-yellow-600 mr-1" />
            <span className="text-sm font-medium text-yellow-800">
              {points} pts
            </span>
          </div>
          {streak > 0 && (
            <div className="bg-red-100 px-2 py-1 rounded-md text-sm text-red-800">
              Streak: {streak}
            </div>
          )}
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <h3 className="font-medium text-blue-800 mb-2">Recycling Guide</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {recyclingData.categories.map((cat, i) => {
              const bin = ["Glass", "Plastic", "Metal", "Paper"].includes(cat)
                ? "Recycle"
                : cat === "Compost"
                ? "Compost"
                : "Landfill";
              const { icon: Icon, color } = BIN_ICONS[bin];
              return (
                <div key={i} className="flex items-center space-x-2">
                  <Icon size={16} className={color} />
                  <span>
                    {cat} → {bin}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Question */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Where should we throw out{" "}
        <span className="text-blue-600 font-bold">
          {subCategory || objectName}
        </span>
        ?
        <button
          onClick={() => setShowHint(!showHint)}
          className="ml-2 text-blue-500 hover:text-blue-700"
        >
          <HelpCircle size={18} />
        </button>
      </h2>

      {showHint && (
        <div className="mb-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
          <p>Hint: {getHint()}</p>
        </div>
      )}

      {/* Bin Choices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(BIN_ICONS).map(
          ([bin, { icon: Icon, color, bg, hover }]) => {
            const correct = isAnswered && bin === correctBin;
            const wrong = isAnswered && bin === selected && bin !== correctBin;
            const style = correct
              ? "bg-green-500 text-white"
              : wrong
              ? "bg-red-500 text-white"
              : isAnswered
              ? "bg-gray-100 text-gray-500"
              : `${bg} ${hover} text-gray-700`;

            return (
              <button
                key={bin}
                disabled={isAnswered}
                onClick={() => handleSelect(bin)}
                className={`p-3 rounded-lg border font-semibold flex flex-col items-center ${style}`}
              >
                <Icon
                  size={24}
                  className={`mb-2 ${isAnswered ? "text-white" : color}`}
                />
                {bin}
              </button>
            );
          }
        )}
      </div>

      {/* Result message */}
      {isAnswered && (
        <div className="mt-4 text-center">
          <p
            className={`${
              selected === correctBin ? "text-green-600" : "text-red-600"
            } font-bold text-lg`}
          >
            {selected === correctBin
              ? `Correct! You earned 10 points.`
              : `The correct answer is ${correctBin}.`}
          </p>
          <button
            onClick={onNext}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}
