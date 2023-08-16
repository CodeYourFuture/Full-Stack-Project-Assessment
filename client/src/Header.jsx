import React from "react";

function Header({ handleOrderChange }) {
  return (
    <header className="App-header">
        <h1>Video Recommendation</h1>
      <div className="toggle-btn">
        <span>ASC</span>
        <input type="checkbox" id="switch" />
        <label htmlFor="switch" onClick={handleOrderChange} id="switch-btn">
          Toggle
        </label>
        <span>DESC</span>
        <input type="checkbox" id="switch" />
        <label htmlFor="switch" onClick={handleOrderChange} id="switch-btn"></label>
      </div>
    </header>
  );
}

export default Header;
