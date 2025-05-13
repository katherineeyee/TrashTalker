import React, { useState, useEffect } from "react";
import QuizSection from "./QuizSection";
import { uploadImage } from "../hooks/uploadUtils";
import { Upload, RefreshCw } from "lucide-react";

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recyclingData, setRecyclingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/recycling-data.json")
      .then((res) => res.json())
      .then(setRecyclingData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!image) return setPreview(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(image);
  }, [image]);

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setResult(null);
      setError(null);
    }
  };

  const handleImageChange = (e) => handleFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    try {
      let data = await uploadImage(image, "http://localhost:5000/predict");
      if (recyclingData && data?.object && !data.mainCategory) {
        const name = data.object.toLowerCase();
        const match = recyclingData.items.find(
          (i) => i.name.toLowerCase() === name
        );
        data.mainCategory = match?.category;

        if (!data.mainCategory) {
          for (const [cat, keywords] of Object.entries(
            recyclingData.keywords
          )) {
            if (keywords.some((k) => name.includes(k.toLowerCase()))) {
              data.mainCategory = cat;
              break;
            }
          }
        }

        const cat = data.mainCategory;
        data.binType = ["Glass", "Plastic", "Metal", "Paper"].includes(cat)
          ? "Recycle"
          : cat === "Compost"
          ? "Compost"
          : "Landfill";
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to analyze image");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <QuizSection
          objectName={result.object}
          subCategory={result.subCategory}
          mainCategory={result.mainCategory}
          onNext={reset}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recycling Item Detector
        </h2>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 hover:bg-blue-50 transition"
        >
          {preview ? (
            <div className="flex flex-col items-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 max-w-full rounded-lg mb-4 object-contain"
              />
              <button
                onClick={reset}
                className="text-red-500 underline text-sm"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-16 w-16 text-blue-400 mb-4" />
              <p className="text-gray-700 font-medium mb-2">
                Drag and drop your image here
              </p>
              <p className="text-gray-500 text-sm mb-4">
                or click to select a file
              </p>
              <label className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg cursor-pointer flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!image || loading}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center font-medium"
        >
          {loading ? (
            <>
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              Analyzing Image...
            </>
          ) : (
            "Identify Recyclable Item"
          )}
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
