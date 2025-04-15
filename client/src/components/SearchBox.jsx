import React, { useState, useRef } from "react";
import { Search, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Original search functionality for future API integration
    if (uploadedImage) {
      console.log("Processing image:", uploadedImage);
      // Future image processing API here
    } else if (searchQuery) {
      console.log("Processing text search:", searchQuery);
      // Future text search API here
    }

    // Material page navigation for current temporart page
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
    } else if (uploadedImage) {
      // For image uploads, just use a random material for now
      const materials = ["Glass", "Plastic", "Compost"];
      const randomMaterial =
        materials[Math.floor(Math.random() * materials.length)];
      navigate(`/${randomMaterial}`);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
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
            onChange={handleImageUpload}
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

        {/* Image Preview if an image is uploaded */}
        {imagePreview && (
          <div className="mt-4 flex items-center">
            <div className="relative h-24 w-24 rounded overflow-hidden border border-gray-300">
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 text-xs"
                title="Remove image"
              >
                ✕
              </button>
            </div>
            <span className="ml-3 text-sm text-gray-700">
              Image ready for identification
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBox;
