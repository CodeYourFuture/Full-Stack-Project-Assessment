import React, { useState, useEffect } from "react";
import AddVideoForm from "./components/AddVideoForm";
import MainTitle from "./components/MainTitle";
import VideoCard from "./components/VideoCard";
import OrderSelect from "./components/OrderSelect";
import { CircularProgress } from "@mui/material";
import "./App.css";

const serverUrl = "https://simeon-video-recommendation.onrender.com";
const REGEXP =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

const isValidYoutubeUrl = (link) => {
  return link.trim().match(REGEXP) !== null;
};

const App = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [order, setOrder] = useState("");

  // Get "/"
  useEffect(() => {
    let orderPath = "";
    if (order) {
      orderPath = `/?order=${order}`;
    }
    const getData = async () => {
      try {
        const res = await fetch(`${serverUrl}/videos${orderPath}`);
        if (!res.ok) {
          return;
        }
        let allVideos = await res.json();
        setVideos(allVideos);
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
  }, [videos, order]);

  // Post "/"
  const addVideo = async () => {
    const newVideo = {
      title: title,
      url: url,
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(newVideo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const res = await fetch(`${serverUrl}/videos`, requestOptions);
      if (res.status === 400) {
        setMessage("Please enter a valid Youtube link or Title");
        return;
      }
      if (res.status === 422) {
        setMessage("This video already exists");
        return;
      }
      if (!res.ok) {
        return;
      }
      setMessage(`Video ${newVideo.title} was added`);
      setTitle("");
      setUrl("");
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !isValidYoutubeUrl(url)) {
      setMessage("Please enter a valid Youtube link or Title");
      return;
    }
    addVideo();
  };

  const handleOnChangeOrder = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setOrder(value);
  };

  return (
    <div className="App">
      <header className="App_header">
        <MainTitle />
        <AddVideoForm
          handleSubmit={handleSubmit}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          message={message}
        />
      </header>
      <nav className="nav_wrapper">
        <OrderSelect handleOnChangeOrder={handleOnChangeOrder} />
      </nav>
      <div className="video_container">
        {loading && (
          <div>
            <CircularProgress /> <br />
            <span>Loading, please wait...</span>
          </div>
        )}
        {error && (
          <span>{`There is a problem fetching the post data - ${error}`}</span>
        )}
        {videos &&
          videos.map((video) => (
            <VideoCard
              video={video}
              key={video.id}
              setMessage={setMessage}
              serverUrl={serverUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
