import React from "react";
import Search from "./Search";

function Header({ videos, setVideos, data }) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <div>
        <Search videos={videos} setVideos={setVideos} data={data} />
      </div>
    </div>
  );
}

export default Header;
