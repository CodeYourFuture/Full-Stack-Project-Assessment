import "./App.css";
import React, { useState, useEffect} from "react";
// import data from './data';
import Video from './Video';
import AddVideo from "./AddVideo";

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleRemoveVideo = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/${id}`, { method: "DELETE" });
      setVideos(videos.filter((video) => video.id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleUpVote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/${id}`, { method: "PUT" });
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video.id === id) {
            return { ...video, rating: video.rating + 1 };
          }
          return video;
        })
      );
    } catch (error) {
      console.error("Error upvoting video:", error);
    }
  };

  const handleDownVote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/${id}`, { method: "PUT" });
      setVideos((prevVideos) =>
        prevVideos.map((video) => {
          if (video.id === id) {
            return { ...video, rating: Math.max(0, video.rating - 1) };
          }
          return video;
        })
      );
    } catch (error) {
      console.error("Error downvoting video:", error);
    }
  };

  const handleAddVideo = async (video) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(video),
      });
      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, { id: data.id, ...video }]);
    } catch (error) {
      console.error("Error adding video:", error);
    }
  };

  return (
    <>
      <div className="App-header">
        <h1>Video Recommendation</h1>
        <AddVideo onAdd={handleAddVideo} />
      </div>
      <div className="App">
        {videos.map((video) => (
          <Video
            key={video.id}
            video={video}
            onRemove={() => handleRemoveVideo(video.id)}
            onUpVote={() => handleUpVote(video.id)}
            onDownVote={() => handleDownVote(video.id)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
