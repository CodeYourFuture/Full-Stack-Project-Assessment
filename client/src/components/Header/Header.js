// eslint-disable-next-line 
import React from "react";
// import background from "./client/src/components/Header/background";
import "./Header.css";

const Header = () => {
  return (
    <header  className="App-header py-5">
    {/* <img src={ background.jpg } alt="Logo" /> */}
    <span onClick={() => window.scroll(0, 0)} className="header">
      <span className="fs-1">🎬  Video Recommendation Hub  🎥</span>
    </span>
    
    </header>
  );
};

export default Header;