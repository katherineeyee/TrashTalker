import React, {useEffect, useState} from 'react';
import {onUserStateChange} from "../api/firebase";

const QuizSection = ({ objectName, subCategory, mainCategory, onNext }) => {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // get user from firebase
  useEffect(() => {
    onUserStateChange(setAuthUser);
  }, []);

  // define current user email
  let email = null;
  if (authUser?.email) {
    email = authUser.email;
  }

  const options = ["Recycle", "Compost", "Landfill"];

  const handleSelect = async (option) => {
    if (!isAnswered) {
      setSelected(option);
      setIsAnswered(true);
      try {
        await fetch("http://localhost:5001/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: "000000000000000000000000", // 실제 로그인 연동 시 변경
            imageId: "image-" + Math.random().toString(36).substr(2, 9),
            object: objectName,
            subCategory: subCategory,
            mainCategory: mainCategory,
            userAnswer: option,
            isCorrect: option === mainCategory,
            rewardGiven: option === mainCategory
          }),
        });
      } catch (err) {
        console.error("Error saving quiz result:", err);
      }

      // add points if user is correct
      if (option === mainCategory) {
        try {
          let x = 50;
          await fetch(`http://localhost:5001/api/users/${encodeURIComponent(email)}/points?numPoints=${x}`, {
            method: "PUT",
          });
        } catch(error) {
          console.error("Error adding user points: ", error);
        }
      }
    }
  };

  const handleNext = () => {
    setSelected(null);
    setIsAnswered(false);
    onNext(); // 상위 컴포넌트에서 초기화
  };

  return (
    <div className="p-4 rounded-xl bg-white shadow-md max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Where should we throw out <span className="text-blue-600 font-bold">{subCategory}</span>?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`p-3 rounded-lg border text-white font-semibold transition duration-200 ${
              isAnswered
                ? option === mainCategory
                  ? "bg-green-500"
                  : option === selected
                    ? "bg-red-500"
                    : "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-4 text-center">
          {selected === mainCategory ? (
            <p className="text-green-600 font-bold text-lg">🎉 Congraturation! You get 50 rewards!</p>
          ) : (
            <p className="text-red-600 font-bold text-lg">
              ❌ The answer is <span className="underline">{mainCategory}</span>.
            </p>
          )}
          <button
            onClick={handleNext}
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
