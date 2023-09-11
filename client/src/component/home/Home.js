import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "../home/home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const url =
    "https://beko-video-project-fs-assessment-backend.onrender.com/videos/data";

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

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchButton = () => {
    const searchVideo = videos.find((video) =>
        video.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        video.id === Number(searchInput)
    );
    
    if (searchVideo) {
      setSelectedVideo(searchVideo);
    }
  };


  return (
    <div className="home-div">
      <div className="header-div">
        <h1>Beko Videos World</h1>
        <span>Where You Can Share Your Favorite & Recommendation videos</span>
      </div>

      <div className="mid-div">
        <input
          onChange={searchHandler}
          value={searchInput}
          className="search-input"
          placeholder="Search for videos..."
        />
        <button
          onClick={searchButton}
          type="button"
          className="search-btn btn-primary"
        >
          Search
        </button>

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
