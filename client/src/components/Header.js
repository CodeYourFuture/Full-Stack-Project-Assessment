import React from "react";
import logo from "../images/youtube-logo.png";

const Header = () => {
  return (
    <div>
      <header id="App-header">
        <img className="logo" src={logo} alt="youtube-logo" />
        <h1>ViewTube</h1>
      </header>
    </div>
  );
};

export default Header;
