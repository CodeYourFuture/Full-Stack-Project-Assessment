import React, { useState, useEffect } from "react";
import "./App.css";
import AddVideo from "./component/AddVideo";
import ListVideo from "./component/ListVideo";

function App() {

  const [videosYoutube, setVideosYoutube] = useState([]);

  useEffect(() => {
    async function getVideos() {
      const res = await fetch("http://localhost:5000");
      const data = await res.json();

      setVideosYoutube([...data]);
    }

    getVideos();
  }, []);

  const addVideo = (video) => {
    let newVideoList = [...videosYoutube];
    newVideoList.push(video);
    setVideosYoutube(newVideoList);
  };

  const deleteVideo = async (videoId) => {

      const res = await fetch(`http://localhost:5000/${videoId}`, {
      method: "DELETE"
    });
    await res.json();
    setVideosYoutube(videosYoutube.filter((video) => video.id !== videoId));
  };

  return (
    <div className="App">
      <header className="App-header">Video Recommendation</header>
      <AddVideo addVideo={addVideo} />
      <ListVideo videosYoutube={videosYoutube} deleteVideo={deleteVideo} />
    </div>
  );
}

export default App;