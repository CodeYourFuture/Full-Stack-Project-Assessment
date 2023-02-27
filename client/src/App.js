import "./App.css";
import VideoList from "./components/VideoList";
import InputForm from "./components/InputForm";
import AddVideoButton from "./components/AddVideoButton";
import { useState, useEffect } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isYoutubeUrlValid(url)) {
      const newVideo = {
        id: Number(new Date().getTime()),
        title: title,
        url: extractVideoKey(url),
        rating: 1,
      };
      fetch("http://127.0.0.1:5000/addVideo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      })
        .then((res) => res.json())
        .then((data) => data);
      setVideos([...videos, newVideo]);
      //addVideo(newVideo);
      // setTitle("");
      // setUrl("");
    } else {
      alert("Invalid URL");
      console.log("Invalid URL");
    }
  };

  function isYoutubeUrlValid(url) {
    try {
      const { hostname } = new URL(url);

      return hostname === "www.youtube.com" || hostname === "youtu.be";
    } catch {
      return false;
    }
  }

  function extractVideoKey(url) {
    const regex = /watch\?v=(\w+)/;
    const match = url.match(regex);
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  const handleDeleteVideo = (key) => {
    setVideos(videos.filter((video) => video.v_id !== key));
    fetch(`http://127.0.0.1:5000/delete/${key}`, {
      method: "delete",
      body: JSON.stringify(key),
    })
      .then((response) => response.json())
      .then((data) => data);
  };

  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>

      <div className="addVideoForm">
        <AddVideoButton displayForm={displayForm} hideForm={hideForm} />
        {showForm ? (
          <InputForm
            title={title}
            url={url}
            handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
            handleSubmit={handleSubmit}
          />
        ) : null}
      </div>

      <VideoList handleDeleteVideo={handleDeleteVideo} videos={videos} />
    </div>
  );
}

export default App;
