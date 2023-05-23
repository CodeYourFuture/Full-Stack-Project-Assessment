import { useState } from "react";
import Header from "./components/Header";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import data from "./exampleresponse.json";
import "./App.css";

function App() {
  const [videos, setVideos] = useState(data);

  const addVideo = (video) => {
    setVideos([video, ...videos]);
  };

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
      <Header />
      <AddVideoForm onAddVideo={addVideo} />
      <div className="video-list">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            removeVideo={removeVideo}
            upVote={upVote}
            downVote={downVote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
