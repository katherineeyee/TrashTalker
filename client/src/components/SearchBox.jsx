import React, { useState, useRef } from "react";
import { Search, Camera, Trash2, ThumbsUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  uploadImage,
  createPreviewUrl,
  revokePreviewUrl,
} from "../hooks/uploadUtils";

// Search keyword mappings
const MATERIAL_ROUTES = {
  glass: ["glass", "bottle", "jar"],
  plastic: ["plastic", "container"],
  compost: ["compost", "food", "organic"],
  metal: ["metal", "can", "aluminum"],
  // Add other categories as needed
};

function SearchBox() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle text search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    const query = searchQuery.toLowerCase();
    for (const [route, keywords] of Object.entries(MATERIAL_ROUTES)) {
      if (keywords.some((kw) => query.includes(kw))) {
        navigate(`/${route.charAt(0).toUpperCase() + route.slice(1)}`);
        break;
      }
    }
  };

  // Handle image file selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: createPreviewUrl(file),
    }));

    setImages([...images, ...newImages]);
    if (!selected) {
      setSelected(newImages[0]);
    }
  };

  // Process the selected image
  const detectItem = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);

    try {
      const data = await uploadImage(
        selected.file,
        "http://localhost:5000/predict"
      );
      setResults({
        ...results,
        [selected.id]: data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to tips page based on detection result
  const viewTips = () => {
    const result = results[selected?.id];
    if (!result) return;

    const mainCategory = result.mainCategory?.toLowerCase();
    if (mainCategory) {
      navigate(
        `/${mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)}`
      );
    }
  };

  // Select an image from the gallery
  const selectImage = (id) => {
    const image = images.find((img) => img.id === id);
    if (image) {
      setSelected(image);
    }
  };

  // Remove an image
  const removeImage = (id, e) => {
    e?.stopPropagation();
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove) {
      revokePreviewUrl(imageToRemove.preview);
    }

    const newImages = images.filter((img) => img.id !== id);
    setImages(newImages);

    if (selected?.id === id) {
      setSelected(newImages[0] || null);
    }

    const newResults = { ...results };
    delete newResults[id];
    setResults(newResults);
  };

  // Clear all images
  const clearAll = () => {
    images.forEach((img) => revokePreviewUrl(img.preview));
    setImages([]);
    setSelected(null);
    setResults({});
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Search className="ml-4 mr-3 h-5 w-5 text-gray-500 self-center" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow py-4 px-3 focus:outline-none"
          placeholder="What would you like to recycle?"
        />
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="bg-gray-100 hover:bg-gray-200 p-3 mr-1"
        >
          <Camera className="h-6 w-6 text-gray-600" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="submit"
          className="bg-[#4CAF50] hover:bg-[#3d8b40] text-white px-6"
        >
          Search
        </button>
      </form>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recyclable Item Detection</h3>
            <button onClick={clearAll} className="text-red-500">
              <Trash2 size={20} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {images.map((img) => (
              <div
                key={img.id}
                className={`relative flex-shrink-0 cursor-pointer ${
                  selected?.id === img.id ? "ring-2 ring-[#4CAF50]" : ""
                }`}
                onClick={() => selectImage(img.id)}
              >
                <img
                  src={img.preview}
                  alt="Upload"
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  onClick={(e) => removeImage(img.id, e)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-full"
                >
                  <X size={12} />
                </button>
                {results[img.id] && (
                  <div className="absolute bottom-0 inset-x-0 bg-green-500 text-white text-xs py-0.5 text-center">
                    ✓
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => fileRef.current.click()}
              className="flex-shrink-0 w-20 h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-[#4CAF50]"
            >
              <Camera className="h-8 w-8 text-gray-400" />
            </button>
          </div>

          {/* Selected Image Preview & Actions */}
          {selected && (
            <>
              <img
                src={selected.preview}
                alt="Selected"
                className="max-h-80 mx-auto rounded mb-4"
              />

              <div className="flex gap-2 mb-4">
                <button
                  onClick={detectItem}
                  disabled={loading || results[selected.id]}
                  className="flex-1 bg-[#4CAF50] text-white py-2 px-4 rounded disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : results[selected.id]
                    ? "✓ Detected"
                    : "Detect Item"}
                </button>

                {results[selected.id] && (
                  <button
                    onClick={viewTips}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    <ThumbsUp size={18} className="inline mr-2" /> View
                    Recycling Tips
                  </button>
                )}
              </div>

              {/* Results Display */}
              {results[selected.id] && (
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium">Detection Results:</p>
                  <div className="mt-2">
                    <p>
                      <span className="font-medium">Object:</span>{" "}
                      {results[selected.id].object}
                    </p>
                    <p>
                      <span className="font-medium">Material:</span>{" "}
                      {results[selected.id].subCategory}
                    </p>
                    <p>
                      <span className="font-medium">Bin Type:</span>{" "}
                      {results[selected.id].mainCategory}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>Error: {error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
