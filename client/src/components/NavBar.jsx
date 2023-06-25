import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      
      <div className="navbar-input">
        <label htmlFor="titleInput">Title:</label>
        <input placeholder="Enter the Title" id="titleInput" type="text" />
      </div>

      <div className="navbar-input">
        <label htmlFor="urlInput">URL:</label>
        <input placeholder="Enter the Url" id="urlInput" type="text" />
      </div>

      <button>ADD</button>
    </div>
  );
}

export default NavBar;
