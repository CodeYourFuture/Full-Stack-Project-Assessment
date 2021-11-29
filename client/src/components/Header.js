import React from "react";
import SearchVideo from "./SearchVideo"

export default function Header({videos, setVideos, videosData}) {
  return (
    <div className="header">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <nav>
          <SearchVideo videos={videos} setVideos={setVideos} videosData={videosData} />
        </nav>
      </header>
    </div>
  );
}
