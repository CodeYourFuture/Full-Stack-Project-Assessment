import React, { useState, useEffect } from "react";
import VideoCell from "./VideoCell";
import Header from "./Header";
import AddVideo from "./AddVideo";
import axios from "axios";

function HomePage() {
  const [videos, setVideos] = useState([]);

  const getData = async () => {
    const res = await fetch("https://video-laleh.herokuapp.com/api/videos");
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/videos/${id}`, {
        method: "DELETE",
      });
      setVideos(videos.filter((video) => video.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event, title, url) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:4000/api/videos/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          url: url,
        }),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <AddVideo onAdd={handleSubmit} />
      {videos.map((video, index) => {
        return (
          <VideoCell
            key={index}
            id={video.id}
            title={video.title}
            url={video.url}
            rating={video.rating}
            onDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}

export default HomePage;
