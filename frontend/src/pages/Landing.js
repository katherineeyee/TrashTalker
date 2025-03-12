import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const commonMaterials = [
    { id: 1, name: "Glass" },
    { id: 2, name: "Plastic" },
    { id: 3, name: "Compost" },
  ];

  const handleMaterialSelect = (event) => {
    const materialName = event.target.value;
    if (materialName) {
      navigate(`/${materialName.toLowerCase()}`);
    }
  };

  return (
    <div className="landing-page">
      <div className="introduction">
        <div className="text">
          <div className="slogan">Smart.</div>
          <div className="slogan">Efficient.</div>
          <div className="slogan">Eco-Friendly.</div>
          <div className="slogan">TrashTalker.</div>
          <div className="about">Your Smart Waste Management Solution.</div>
          <div className="button-options">
            <Link to="/home">
              <button className="get-started-btn">Get Started</button>
            </Link>
          </div>

          {/* Material dropdown section */}
          <div className="materials-section">
            <h3>Common Materials</h3>
            <select
              className="material-dropdown"
              onChange={handleMaterialSelect}
              defaultValue=""
            >
              <option value="" disabled>
                Select a material
              </option>
              {commonMaterials.map((material) => (
                <option key={material.id} value={material.name}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="image-container">
          <img
            src="/Recycling.png"
            alt="Recycling Illustration"
            className="hero-image"
          />
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-container">
          <div className="stat-value">&lt;30</div>
          <div className="stat-unit">seconds</div>
          <div className="stat-description">AI Waste Detection</div>
        </div>
        <div className="stat-container">
          <div className="stat-value">100%</div>
          <div className="stat-unit">Eco-Friendly</div>
          <div className="stat-description">Sustainable Solutions</div>
        </div>
        <div className="stat-container">
          <div className="stat-value">24/7</div>
          <div className="stat-unit">Support</div>
          <div className="stat-description">Always Here to Help</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
