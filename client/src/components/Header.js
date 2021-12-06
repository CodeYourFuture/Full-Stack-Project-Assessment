import React from "react";
import SearchVideo from "./SearchVideo"

export default function Header({videos, setVideos}) {
  return (
    <div className="header">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <nav>
          <SearchVideo videos={videos} setVideos={setVideos} />
        </nav>
      </header>
    </div>
  );
}
