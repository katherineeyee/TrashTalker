import React, { useState, useRef } from "react";
import { Search, Camera, Trash2, RefreshCw, ThumbsUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetection, setShowDetection] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle file selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResults(null);
      setResultImage(null);
      setShowDetection(true);
    }
  };

  // Open file dialog
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setDetectionResults(null);
    setResultImage(null);
    setShowDetection(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle text search submission
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      if (
        query.includes("glass") ||
        query.includes("bottle") ||
        query.includes("jar")
      ) {
        navigate("/Glass");
      } else if (query.includes("plastic") || query.includes("container")) {
        navigate("/Plastic");
      } else if (
        query.includes("compost") ||
        query.includes("food") ||
        query.includes("organic")
      ) {
        navigate("/Compost");
      } else if (query.includes("rubber") || query.includes("glove")) {
        navigate("/Rubber");
      } else if (query.includes("paper") || query.includes("scrap")) {
        navigate("/Paper");
      } else if (
        query.includes("electronic") ||
        query.includes("phone") ||
        query.includes("device")
      ) {
        navigate("/Electronics");
      } else if (query.includes("battery") || query.includes("lithium")) {
        navigate("/Batteries");
      } else if (
        query.includes("metal") ||
        query.includes("soda") ||
        query.includes("can")
      ) {
        navigate("/Metal");
      }
    }
  };

  // Process image with YOLO
  const detectObjects = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("http://localhost:5002/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setDetectionResults(data.detections);
      setResultImage(`data:image/jpeg;base64,${data.image_with_detections}`);
    } catch (err) {
      console.error("Error detecting objects:", err);
      setError(err.message || "Failed to detect objects in image");
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to material page based on detection results
  const handleNavigateToMaterial = () => {
    if (!detectionResults || detectionResults.length === 0) return;

    // Group detections by waste type
    const wasteTypeGroups = detectionResults.reduce((acc, detection) => {
      if (!acc[detection.waste_type]) {
        acc[detection.waste_type] = [];
      }
      acc[detection.waste_type].push(detection);
      return acc;
    }, {});

    // Get the waste type with the most detections or highest confidence
    let primaryWasteType = null;
    let maxDetections = 0;
    let highestConfidence = 0;

    Object.entries(wasteTypeGroups).forEach(([wasteType, detections]) => {
      // Prioritize by number of detections
      if (detections.length > maxDetections) {
        maxDetections = detections.length;
        primaryWasteType = wasteType;
        // For equal detection counts, use the one with highest confidence
      } else if (detections.length === maxDetections) {
        const maxConfidence = Math.max(...detections.map((d) => d.confidence));
        if (maxConfidence > highestConfidence) {
          highestConfidence = maxConfidence;
          primaryWasteType = wasteType;
        }
      }
    });

    // Navigate to the appropriate material page if a valid waste type was found
    if (primaryWasteType && primaryWasteType !== "Other") {
      navigate(`/${primaryWasteType}`);
    } else {
      // Fallback in case no valid waste type was found
      console.error("No valid waste type found in detections");
    }
  };

  // Group detections by waste type
  const groupedDetections = detectionResults
    ? Object.entries(
        detectionResults.reduce((acc, detection) => {
          if (!acc[detection.waste_type]) {
            acc[detection.waste_type] = [];
          }
          acc[detection.waste_type].push(detection);
          return acc;
        }, {})
      )
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
          {/* Search Icon */}
          <div className="pl-4 pr-3">
            <Search className="h-5 w-5 text-gray-500" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow py-4 px-3 focus:outline-none text-gray-700"
            placeholder="What would you like to recycle?"
          />

          {/* Camera/Upload Button */}
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-gray-100 hover:bg-gray-200 p-3 mr-1 rounded-md transition"
            title="Upload image"
          >
            <Camera className="h-6 w-6 text-gray-600" />
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#4CAF50] hover:bg-[#3d8b40] text-white py-3 px-6 transition"
          >
            Search
          </button>
        </div>

        {/* Small Image Preview (only shown when image is uploaded but detection not shown) */}
        {!showDetection && previewUrl && (
          <div className="mt-4 flex items-center">
            <div className="relative h-24 w-24 rounded overflow-hidden border border-gray-300">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
            <span className="ml-3 text-sm text-gray-700">
              Image ready for identification
            </span>
            <button
              type="button"
              onClick={() => setShowDetection(true)}
              className="ml-auto bg-[#4CAF50] text-white px-3 py-1 rounded text-sm hover:bg-opacity-90"
            >
              Identify Now
            </button>
          </div>
        )}
      </form>

      {/* Image Detection Section */}
      {showDetection && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recyclable Item Detection
            </h2>
            <button
              onClick={clearImage}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Image Upload Area */}
          <div className="mb-6">
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                previewUrl
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 hover:border-[#4CAF50] bg-gray-50"
              } transition cursor-pointer`}
              onClick={triggerFileInput}
            >
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={resultImage || previewUrl}
                    alt="Preview"
                    className="max-h-80 mx-auto rounded"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-10">
                  <Camera size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Click to upload an image of recyclable item
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    or drag and drop image here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-6">
            <button
              className="flex-1 bg-[#4CAF50] text-white py-2 px-4 rounded hover:bg-[#3d8b40] transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={detectObjects}
              disabled={!selectedImage || isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Detect Item
                </>
              )}
            </button>

            {detectionResults && (
              <button
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={handleNavigateToMaterial}
              >
                <ThumbsUp size={18} />
                View Recycling Tips
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Detection Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Results */}
          {detectionResults && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-4">
                Detection Results:
              </h3>

              {groupedDetections.length > 0 ? (
                <div className="space-y-4">
                  {groupedDetections.map(([wasteType, items]) => (
                    <div
                      key={wasteType}
                      className="bg-white p-3 rounded border border-gray-200"
                    >
                      <h4 className="font-medium text-[#4CAF50] flex items-center">
                        {wasteType}
                        <span className="ml-2 text-xs bg-[#4CAF50] bg-opacity-20 text-[#4CAF50] rounded-full px-2 py-0.5">
                          {items.length} {items.length === 1 ? "item" : "items"}
                        </span>
                      </h4>
                      <ul className="mt-2 space-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-600">
                            {item.class_name} (
                            {(item.confidence * 100).toFixed(1)}% confidence)
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="text-sm text-gray-500 italic mt-2">
                    Click "View Recycling Tips" to learn how to properly recycle
                    these items
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  No recyclable items detected. Try another image.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchBox;
