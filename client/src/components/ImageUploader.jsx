import React, { useState } from "react";
import QuizSection from "./QuizSection";
import { uploadImage } from "../hooks/uploadUtils";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    try {
      const data = await uploadImage(image, "http://localhost:5000/predict");
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImage(null);
  };

  // Show quiz if we have results, otherwise show upload form
  return (
    <div className="p-6">
      {!result ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={!image || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Start The Game!"}
          </button>
        </form>
      ) : (
        <QuizSection
          objectName={result.object}
          subCategory={result.subCategory}
          mainCategory={result.mainCategory}
          onNext={handleReset}
        />
      )}
    </div>
  );
}

export default ImageUploader;
