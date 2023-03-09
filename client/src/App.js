import React, { useState, useEffect } from "react";
import Video from "./Video";
import axios from "axios";
import videos from "./exampleresponse.json";

const App = () => {
  // const [videosData, setVideosData] = useState(videos);
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/videos");
        setVideosData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = (id) => {
    const updatedVideosData = videosData.filter((video) => video.id !== id);
    setVideosData(updatedVideosData);
  };

  return (
    <div className="container">
      {videosData.map((video) => {
        return (
          <Video key={video.id} video={video} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
};

export default App;
