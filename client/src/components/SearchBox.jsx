import React, { useState, useRef, useEffect } from "react";
import { Search, Camera, Trash2, ThumbsUp, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  uploadImage,
  createPreviewUrl,
  revokePreviewUrl,
} from "../hooks/uploadUtils";

export default function SearchBox() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const [data, setData] = useState({
    categories: [],
    items: [],
    keywords: {},
    popularCategories: [],
  });
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load data
  useEffect(() => {
    fetch("/recycling-data.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const closeDropdown = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target) &&
        inputRef.current !== e.target
      )
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  // Update suggestions
  useEffect(() => {
    if (!query.trim()) return setSuggestions([]);

    const q = query.toLowerCase();
    const exactMatches = data.items.filter(
      (i) =>
        i.name.toLowerCase().startsWith(q) || i.category.toLowerCase() === q
    );
    const partialMatches = data.items.filter(
      (i) =>
        !exactMatches.includes(i) &&
        (i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q))
    );

    setSuggestions([...exactMatches, ...partialMatches].slice(0, 5));
    setShowSuggestions(!!q);
  }, [query, data.items]);

  // Navigation
  const navigateTo = (input) => {
    const term = (typeof input === "string" ? input : query).toLowerCase();

    const category = data.categories.find((c) => c.toLowerCase() === term);
    if (category) return navigate(`/${category}`);

    for (const [cat, keywords] of Object.entries(data.keywords))
      if (keywords.some((kw) => term.includes(kw))) return navigate(`/${cat}`);

    const item = data.items.find((i) => i.name.toLowerCase() === term);
    if (item) navigate(`/${item.category}`);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && activeSuggestion >= 0) {
      e.preventDefault();
      const item = suggestions[activeSuggestion];
      setQuery(item.name);
      setShowSuggestions(false);
      navigateTo(item.category);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Image handling
  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: createPreviewUrl(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
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
      setResults((prev) => ({ ...prev, [selected.id]: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const viewTips = () => {
    const result = results[selected?.id];
    if (result) {
      window.scrollTo(0, 0);
      navigate(`/${result.subCategory || result.mainCategory}`);
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
    images.forEach((img) => revokePreviewUrl(img.preview));
    setImages([]);
    setSelected(null);
    setResults({});
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigateTo();
        }}
        className="flex bg-white rounded-lg shadow-md overflow-hidden relative"
      >
        <Search className="ml-4 mr-3 h-5 w-5 text-gray-500 self-center" />
        <div className="flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-4 px-3 focus:outline-none"
            placeholder="What would you like to recycle?"
            autoComplete="off"
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-10 max-h-60 overflow-y-auto"
            >
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 cursor-pointer flex justify-between ${
                    i === activeSuggestion ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
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

      {/* Categories */}
      {data.popularCategories?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.popularCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/${cat}`)}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recyclable Item Detection</h3>
            <button onClick={clearImages} className="text-red-500">
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
                onClick={() => setSelected(img)}
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

          {/* Selected Image */}
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
                    <ThumbsUp size={18} className="inline mr-2" /> View Tips
                  </button>
                )}
              </div>

              {/* Results */}
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

          {/* Error */}
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
