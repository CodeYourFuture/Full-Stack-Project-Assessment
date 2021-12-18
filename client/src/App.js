import "./App.css";
import { React, useState } from "react";
import data from "./exampleresponse.json";
import AddNewVideos from "./componenets/AddNewVideo";
import VideoCard from "./componenets/VideoCard";

const youTubeVids = data.sort((a, b) => b.rating - a.rating);

function App() {
  const [videos, setVideos] = useState(youTubeVids);

  const [vote, setVote] = useState();

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Video Recommendation</h1>
          <AddNewVideos setVideos={setVideos} />
        </header>
        {videos.map((video) => {
          const indexNum = video.url.indexOf("?v=");
          const videoId = video.url.slice(indexNum + 3);
          const videoRating = video.rating;
          const id = video.id;
          return (
            <VideoCard
              key={id}
              vote={vote}
              setVote={setVote}
              videos={videos}
              videoRating={videoRating}
              id={id}
              videoId={videoId}
              title={video.title}
              setVideos={setVideos}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
