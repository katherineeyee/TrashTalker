import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const materials = [
  {
    id: "glass",
    name: "Glass",
    description: "",
    image: "/glass-icon.png",
  },
  {
    id: "plastic",
    name: "Plastic",
    description: "",
    image: "/plastic-icon.png",
  },
  {
    id: "compost",
    name: "Compost",
    description: "",
    image: "/compost-icon.png",
  },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMaterialSelect = (materialId) => {
    // Since we're no longer using the setSelectedMaterial prop,
    // we can simply navigate to the material page
    navigate(`/${materialId}`);
  };

  // Filter materials based on search term
  const filteredMaterials = materials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Waste Material Resources</h1>
        <p>Find the proper way to dispose of or recycle different materials</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for materials..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="materials-grid">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="material-card"
            onClick={() => handleMaterialSelect(material.id)}
          >
            <div className="material-icon">
              {/* Fallback to placeholder if image isn't available */}
              <img
                src={material.image || "/material-placeholder.png"}
                alt={material.name}
                onError={(e) => {
                  e.target.src = "/material-placeholder.png";
                }}
              />
            </div>
            <div className="material-info">
              <h3>{material.name}</h3>
              <p>{material.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="no-results">
          <p>No materials found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default Home;
