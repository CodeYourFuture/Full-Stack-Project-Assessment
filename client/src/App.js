import { useState } from "react";
import VideoCard from "./components/VideoCard";
import RemoveButton from "./components/RemoveButton";
import VoteButtons from "./components/VoteButtons";
import data from "./exampleresponse.json";
import "./App.css";

function App() {
  const [videos, setVideos] = useState(data);

  const removeVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  const upVote = (id) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: video.rating + 1 };
        }
        return video;
      })
    );
  };

  const downVote = (id) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.id === id) {
          return { ...video, rating: video.rating - 1 };
        }
        return video;
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      {videos.map((video) => (
        <div className="video-list" key={video.id}>
          <VideoCard video={video} />
          <RemoveButton onclick={() => removeVideo(video.id)} />
          <VoteButtons
            onUpVote={() => upVote(video.id)}
            onDownVote={() => downVote(video.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
