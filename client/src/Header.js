import React from "react";
import logo from "./images/youtube-logo.png";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <div>
      <header className="App-header">
        <img className="logo" src={logo} alt="youtube-logo" />
        <h1>ViewTube</h1>
        <SearchBar />
      </header>
    </div>
  );
};

export default Header;
