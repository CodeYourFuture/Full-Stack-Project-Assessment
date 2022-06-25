import React from "react";
import logoIcon from "../images/music.png";

function Header() {
    return (
      <header className="App-header">
        <div className="header-container">
          <div className="logo-container">
            <img
              src={logoIcon}
              alt="media-hut-logo"
              className="media-hut-logo"
            />
          </div>

          <h1>Media Hut</h1>
        </div>
      </header>
    );
}

export default Header;