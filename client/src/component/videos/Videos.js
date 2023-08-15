import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "../videos/videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const url = "http://127.0.0.1:5000/videos/data";

  const fetchVideoData = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      setVideos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  
  // let videoIds = videos.map((vid) => vid.url.split("v=")[1]);


  return (
    <div className="videos-div">
      <h1>Videos Component</h1>
      <div className="vid-div">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <iframe
              width="550"
              height="280"
              src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div>{video.title}</div>
            <div>{video.rating}</div>
            {/* <div>{videos[index].title}</div> */}
            {/* <div>{videos[index].rating}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;

  // const videoUrl = `https://www.youtube.com/embed/${videoId}`;