import "./Nav.css"; 
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span>🎓</span> AlumniConnect
      </div>

      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Search Alumni</a>
        </li>
        <li>
          <a href="#">Events</a>
        </li>
        <li>
          <a href="#" >Dashboard</a>
        </li>
      </ul>

      <div className="nav-buttons">
        <button className="btn btn-login">Login</button>
        <button className="btn btn-signup">Join Network</button>
      </div>
    </nav>
  );
};

export default Navbar;
