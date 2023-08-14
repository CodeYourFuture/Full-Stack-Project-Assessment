import React, { useEffect, useState } from "react";
import axios from "axios";
import "../videos/videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const url = "http://127.0.0.1:5000/videos/data";

  const fetchVideoData = async () => {
    try {
      const res = await axios.get(url);
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [...videos]);

  
  let videoIds = videos.map((vid) => vid.url.split("v=")[1]);


  return (
    <div className="videos-div">
      <h1>Videos Component</h1>
      <div className="vid-div">
        {videoIds.map((vid, index) => (
          <div className="video-card" key={index}>
            <iframe
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${vid}`}
              title={videos[index].title}
              id={videos[index].id}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div>{videos[index].title}</div>
            <div>{videos[index].rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;

  // const videoUrl = `https://www.youtube.com/embed/${videoId}`;
