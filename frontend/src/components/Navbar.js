import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <div className="logo">TrashTalker</div>
          </Link>
        </div>
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Log in
              </Link>
            </li>
            <li>
              <Link to="/sign-up" className="nav-link signup">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
