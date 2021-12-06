import React from "react";
import AddNewVideo from "./AddNewVideo";
import SearchVideo from "./SearchVideo"

export default function Header({videos, setVideos, fetchData}) {
  return (
    <div className="header">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <nav>
          <SearchVideo videos={videos} setVideos={setVideos} />
          <AddNewVideo fetchData={fetchData} />
        </nav>
      </header>
    </div>
  );
}
