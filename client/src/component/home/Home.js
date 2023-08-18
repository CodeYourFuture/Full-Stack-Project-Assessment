import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "../home/home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const url = "http://127.0.0.1:5000/videos/data";

  const videoData = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoData();
  }, []);

  const selectHandler = (e) => {
    const optionById = Number(e.target.value);
    const getSelected = videos.find((vid) => vid.id == optionById);
    setSelectedVideo(getSelected);
  };

  return (
    <div className="home-div">
      <h1>Home Component</h1>

      <div className="mid-div">
        <input
          onChange={selectHandler}
          className="search-input"
          placeholder="Search for videos..."
        />
        <select className="form-select" onChange={selectHandler}>
          <option value="">Select Your Video</option>
          {videos.map((video) => (
            <option key={video.id} value={video.id}>
              {video.title}
            </option>
          ))}
        </select>
      </div>

      <div className="vid-box">
        {selectedVideo && (
          <ReactPlayer
            className="embed-responsive-item"
            url={`https://www.youtube.com/embed/${
              selectedVideo.url.split("=")[1] ||
              selectedVideo.url.split("embed/")[1]
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
