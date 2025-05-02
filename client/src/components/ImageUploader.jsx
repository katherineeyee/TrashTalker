import React, { useState } from 'react';
import QuizSection from './QuizSection';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

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
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Start The game!
          </button>
          {loading && <p className="text-gray-500">Analyzing...</p>}
        </form>
      ) : (
        <QuizSection
          objectName={result.object}
          subCategory={result.subCategory}
          mainCategory={result.mainCategory}
          onNext={() => {
            setResult(null);
            setImage(null);
          }}
        />
      )}
    </div>
  );
}

export default ImageUploader;
