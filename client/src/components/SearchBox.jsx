<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
=======
import React, { useState, useEffect, useRef } from "react";
>>>>>>> origin/main
import { Search, Camera, Trash2, ThumbsUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  uploadImage,
  createPreviewUrl,
  revokePreviewUrl,
} from "../hooks/uploadUtils";

<<<<<<< HEAD
function SearchBox() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const suggestionsRef = useRef(null);

  const [recyclingData, setRecyclingData] = useState({
    categories: [],
    items: [],
    keywords: {},
    popularCategories: [],
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
=======
const MATERIAL_KEYWORDS = {
  glass: ["glass", "bottle", "jar"],
  plastic: ["plastic", "container"],
  compost: ["compost", "food", "organic"],
  metal: ["metal", "can", "aluminum", "soda"],
  rubber: ["rubber", "glove", "tire"],
  paper: ["paper", "cardboard", "newspaper", "book"],
  electronics: ["electronic", "device", "phone", "computer"],
  batteries: ["battery", "lithium", "rechargeable"],
};

export default function SearchBox() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [recyclingData, setRecyclingData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);

>>>>>>> origin/main
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  // Load recycling data
  useEffect(() => {
    fetch("/recycling-data.json")
      .then((response) => response.json())
      .then((data) => {
        setRecyclingData(data);
        setDataLoaded(true);
      })
      .catch((err) => console.error("Error loading recycling data:", err));
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions when query changes
  useEffect(() => {
    if (!query.trim() || !dataLoaded) {
      setSuggestions([]);
      return;
    }

    const lowQuery = query.toLowerCase();
    setSuggestions(
      recyclingData.items
        .filter(
          (item) =>
            item.name.toLowerCase().includes(lowQuery) ||
            item.category.toLowerCase().includes(lowQuery)
        )
        .slice(0, 5)
    );
  }, [query, recyclingData.items, dataLoaded]);

  // Navigate to material page based on query
  const navigateTo = (input) => {
    if (!dataLoaded) return;

    const lowInput = (typeof input === "string" ? input : query).toLowerCase();

    // Direct category match
    const category = recyclingData.categories.find(
      (c) => c.toLowerCase() === lowInput
    );
    if (category) {
      navigate(`/${category}`);
      return;
    }

    // Keyword match
    for (const [cat, keywords] of Object.entries(recyclingData.keywords)) {
      if (keywords.some((kw) => lowInput.includes(kw))) {
        navigate(`/${cat}`);
        return;
      }
    }

    // Item name match
    const item = recyclingData.items.find(
      (i) => i.name.toLowerCase() === lowInput
    );
    if (item) navigate(`/${item.category}`);
  };

  // Image handling functions
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
=======
  useEffect(() => {
    fetch("/recycling-data.json")
      .then((res) => res.json())
      .then(setRecyclingData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim() || !recyclingData) return setSearchResults([]);

    const term = searchTerm.toLowerCase();
    let matches = recyclingData.items.filter((item) =>
      item.name.toLowerCase().includes(term)
    );

    if (matches.length < 5) {
      for (const [category, keywords] of Object.entries(
        recyclingData.keywords
      )) {
        keywords
          .filter((kw) => kw.includes(term))
          .forEach((keyword) => {
            if (!matches.some((r) => r.name.toLowerCase().includes(keyword))) {
              matches.push({
                name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
                category,
                isKeywordMatch: true,
              });
            }
          });
      }
    }

    setSearchResults(matches.slice(0, 8));
  }, [searchTerm, recyclingData]);

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleResultClick = (item) => {
    scrollToTopAndNavigate(`/${item.category}`);
    setSearchTerm("");
    setIsOpen(false);
    setNotFound(false);
  };
>>>>>>> origin/main

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();

    const exact = searchResults.find(
      (item) => item.name.toLowerCase() === term
    );
    if (exact) return handleResultClick(exact);

    for (const [route, keywords] of Object.entries(MATERIAL_KEYWORDS)) {
      if (keywords.some((kw) => term.includes(kw))) {
        scrollToTopAndNavigate(`/${route}`);
        return;
      }
    }

    setNotFound(true);
  };

  const handleUpload = (e) => {
    const newFiles = Array.from(e.target.files || []);
    const newImages = newFiles.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: createPreviewUrl(file),
    }));
<<<<<<< HEAD

    setImages([...images, ...newImages]);
=======
    setImages((prev) => [...prev, ...newImages]);
>>>>>>> origin/main
    if (!selected) setSelected(newImages[0]);
  };

  const detectItem = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const data = await uploadImage(
        selected.file,
        "http://localhost:5000/predict"
      );
<<<<<<< HEAD
      setResults({ ...results, [selected.id]: data });
=======
      setResults((prev) => ({ ...prev, [selected.id]: data }));
>>>>>>> origin/main
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const viewTips = () => {
    const result = results[selected?.id];
    if (!result) return;

    const routeName = result.subCategory || result.mainCategory;
    if (routeName) {
      window.scrollTo(0, 0);
      navigate(`/${routeName}`);
    }
  };

  const removeImage = (id, e) => {
    e?.stopPropagation();
    const img = images.find((img) => img.id === id);
    if (img) revokePreviewUrl(img.preview);

    const newImages = images.filter((img) => img.id !== id);
    setImages(newImages);
    if (selected?.id === id) setSelected(newImages[0] || null);

    const newResults = { ...results };
    delete newResults[id];
    setResults(newResults);
  };

  const clearImages = () => {
=======
  const removeAllImages = () => {
>>>>>>> origin/main
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
<<<<<<< HEAD
        onSubmit={(e) => {
          e.preventDefault();
          navigateTo();
        }}
        className="flex bg-white rounded-lg shadow-md overflow-hidden relative"
      >
        <Search className="ml-4 mr-3 h-5 w-5 text-gray-500 self-center" />
        <div className="flex-grow relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full py-4 px-3 focus:outline-none"
            placeholder="What would you like to recycle?"
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-10 max-h-60 overflow-y-auto"
            >
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  onClick={() => {
                    setQuery(item.name);
                    setShowSuggestions(false);
                    navigateTo(item.category);
                  }}
                >
                  <span>{item.name}</span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

=======
        onSubmit={handleSubmit}
        className="flex bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Search className="ml-4 mr-3 h-5 w-5 text-gray-500 self-center" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(!!e.target.value.trim());
            setNotFound(false);
          }}
          className="flex-grow py-4 px-3 focus:outline-none"
          placeholder="What would you like to recycle?"
        />
>>>>>>> origin/main
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
          onChange={handleUpload}
          className="hidden"
        />
        <button
          type="submit"
          className="bg-[#4CAF50] hover:bg-[#3d8b40] text-white px-6"
        >
          Search
        </button>
      </form>

<<<<<<< HEAD
      {/* Quick Categories */}
      {dataLoaded && (
        <div className="mt-4 flex flex-wrap gap-2">
          {recyclingData.popularCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/${cat}`)}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
            >
              {cat}
            </button>
=======
      {/* Suggestions */}
      {isOpen && searchResults.length > 0 && (
        <div className="bg-white shadow-md rounded-md mt-2 border z-10">
          {searchResults.map((item, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
>>>>>>> origin/main
          ))}
        </div>
      )}

<<<<<<< HEAD
      {/* Image Gallery */}
=======
      {/* No result found */}
      {notFound && (
        <div className="mt-2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded">
          <p>Sorry, no match found for "{searchTerm}".</p>
        </div>
      )}

      {/* Image Detection */}
>>>>>>> origin/main
      {images.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recyclable Item Detection</h3>
<<<<<<< HEAD
            <button onClick={clearImages} className="text-red-500">
=======
            <button onClick={removeAllImages} className="text-red-500">
>>>>>>> origin/main
              <Trash2 size={20} />
            </button>
          </div>

          {/* Image thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {images.map((img) => (
              <div
                key={img.id}
                className={`relative flex-shrink-0 cursor-pointer ${
                  selected?.id === img.id ? "ring-2 ring-[#4CAF50]" : ""
                }`}
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.preview}
                  alt="Upload"
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    revokePreviewUrl(img.preview);
                    const updated = images.filter((i) => i.id !== img.id);
                    setImages(updated);
                    if (selected?.id === img.id)
                      setSelected(updated[0] || null);
                    const newResults = { ...results };
                    delete newResults[img.id];
                    setResults(newResults);
                  }}
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

<<<<<<< HEAD
          {/* Selected Image */}
=======
          {/* Detection results */}
>>>>>>> origin/main
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
                  className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded font-semibold disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : results[selected.id]
                    ? "✓ Detected"
                    : "Detect Item"}
                </button>
                {results[selected.id] && (
                  <button
                    onClick={() =>
                      scrollToTopAndNavigate(
                        `/${
                          results[selected.id].subCategory ||
                          results[selected.id].mainCategory
                        }`
                      )
                    }
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-semibold"
                  >
                    <ThumbsUp size={18} className="inline mr-2" /> View
                    Recycling Tips
                  </button>
                )}
              </div>
<<<<<<< HEAD

              {/* Results */}
=======
>>>>>>> origin/main
              {results[selected.id] && (
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-medium">Detection Results:</p>
                  <p>
                    <strong>Object:</strong> {results[selected.id].object}
                  </p>
                  <p>
                    <strong>Material:</strong>{" "}
                    {results[selected.id].subCategory}
                  </p>
                  <p>
                    <strong>Bin Type:</strong>{" "}
                    {results[selected.id].mainCategory}
                  </p>
                </div>
              )}
            </>
          )}

<<<<<<< HEAD
          {/* Error */}
=======
>>>>>>> origin/main
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
