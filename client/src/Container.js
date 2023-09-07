import React, { useState , useEffect } from "react";
import VideoSection from "./VideoSection";
import VideoContainer from "./VideoContainer";

const Container = () => {
  let videoData = [];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        videoData = [...data];
        setVideos(videoData);
      })
      .catch((error) => console.log(error));
  }, []);



const handleRemove = (id) => {
fetch(`http://localhost:5000/${id}`, { method: "DELETE" })
  .then(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => {
        videoData = [...data];
        setVideos(videoData);
      });
  })
  .catch((error) => console.log(error));
};


  function handleAddVideo (video)  {
    fetch(`http://localhost:5000/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    })
      .then(() => {
        fetch("http://localhost:5000/")
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
  };


  const handleUpVote = (video) => {
    video.rating = video.rating+1;
    console.log(`my video data`,video);
    fetch(`http://localhost:5000/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({video})
    })
      .then(() => {
        fetch(`http://localhost:5000/`)
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
      .catch((error) => console.log(error));
  }

  
    const handleDownVote = (video) => {
    video.rating = video.rating-1;
    console.log(`my video data`, video);
    fetch(`http://localhost:5000/${video.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ video }),
    })
      .then(() => {
        fetch(`http://localhost:5000/`)
          .then((response) => response.json())
          .then((data) => {
            videoData = [...data];
            setVideos(videoData);
          });
      })
      .catch((error) => console.log(error));
    };

  return (
    <div>
      <VideoContainer handleAddVideo={handleAddVideo} />
      <VideoSection
        videos={videos}
        upVote={handleUpVote}
        downVote={handleDownVote}
        removeVideo={handleRemove}
      />
    </div>
  );
};

export default Container;
