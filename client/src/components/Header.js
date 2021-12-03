import React, { useState } from "react";
import logo from "../images/youtube-logo.png";
import SearchBar from "./SearchBar";

const Header = () => {
  const [videoData, setVideoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const searchVideoData = videoData.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <header id="App-header">
        <img className="logo" src={logo} alt="youtube-logo" />
        <h1>ViewTube</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
    </div>
  );
};

export default Header;
