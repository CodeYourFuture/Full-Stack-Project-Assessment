import React, { useState, useEffect } from "react";
import AddVideoForm from "./components/AddVideoForm";
import VideoCard from "./components/VideoCard";
import "./App.css";

const sortVideosByRating = (videos) =>
  videos.sort((v1, v2) => (v1.rating < v2.rating ? 1 : -1));

const App = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const serverUrl = "https://simeon-video-recommendation.onrender.com";

  // Get "/"
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(serverUrl);
        if (!res.ok) {
          return;
        }
        let data = await res.json();
        data = sortVideosByRating(data);
        setVideos(data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setVideos(null);
        setLoading(false);
        console.error(`An error occurred: ${err}`);
      }
    };
    getData();
  }, [videos]);

  // Post "/"
  const addVideo = async (title, url) => {
    const newVideo = {
      "title": title,
      "url": url
    }
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const res = await fetch(serverUrl, requestOptions);
      if (res.status === 400) {
        setMessage("Please enter a valid Youtube link or Title");
        return;
      }
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setMessage(`Video ${data.title} was added`);
      setTitle("");
      setUrl("");
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addVideo(title, url);
  };

  // Delete "/"
  const deleteVideo = async (id) => {
    try {
      const res = await fetch(`${serverUrl}/${id}`, {
      method: "DELETE"});
      if (!res.ok) {
        return;
      }
      setMessage("Video was deleted");
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  return (
    <div className="App">
      <header className="App_header">
        <h1>Video Recommendation</h1>
        <AddVideoForm
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          message={message}
        />
      </header>
      <div className="video_container">
        {loading && <span>Loading, please wait...</span>}
        {error && (
          <span>{`There is a problem fetching the post data - ${error}`}</span>
        )}
        {videos &&
          videos.map((video) => (
            <VideoCard
              video={video}
              key={video.id}
              delVid={() => deleteVideo(video.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default App;