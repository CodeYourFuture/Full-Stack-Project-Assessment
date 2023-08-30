import React, { useEffect, useState } from "react";
import Video from "./Video";
import AddVideo from "./AddVideo";
import "../index.css";

function VideosList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const newVideo = (newInput) => {
    newInput.id = videos.length + 1;
    newInput.rating = 0;
    setVideos([...videos, newInput]);
  };

  const deleteVideoItem = (videoId) => {
    const videoDeleted = videos.filter((el) => el.id !== videoId);
    setVideos(videoDeleted);
  };

  const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);
  return (
    <>
      <AddVideo onVidAdd={newVideo} />
      <div className="container mt-5">
        {sortedVideos.map((video) => (
          <Video videoObj={video} key={video.id} deleteVideo={deleteVideoItem} />
        ))}
      </div>
    </>
  );
}

export default VideosList;
