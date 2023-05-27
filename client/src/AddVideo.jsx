import { useState, React } from "react";
import "./AddVideo.css";

export const AddVideo = ({ videos, setVideos }) => {
  const [clickAdd, setClickAdd] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleAddVideoButton = () => {
    clickAdd === false ? setClickAdd(true) : setClickAdd(false);
  };

  const handleTitleInputChange = (e) => {
    e.preventDefault();
    setTitleInput(e.target.value);
  };

  const handleUrlInputChange = (e) => {
    e.preventDefault();
    let url = e.target.value;
    if (url.includes("https://www.youtube.com/")) {
      url = url.replace("watch?v=", "embed/");
      return setUrlInput(url);
    } else {
      alert("Invalid URL format. Please provide a YouTube URL");
      setUrlInput("");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let newVideo = {
      title: titleInput,
      url: urlInput,
    };
    fetch("https://lorena-fullstack-app.onrender.com/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVideo),
    })
      .then((response) => response.json())
      .then((data) => {
        setVideos([...videos, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTitleInput("");
    setUrlInput("");
  };

  return (
    <div className="addVideoContainer">
      <a
        className="addVideo"
        href="/index"
        alt="Add video button"
        onClick={handleAddVideoButton}
      >
        Add video
      </a>
      {clickAdd === true ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              value={titleInput}
              onChange={handleTitleInputChange}
              name="title"
              required
            />
          </label>
          <label>
            URL
            <input
              type="text"
              value={urlInput}
              onChange={handleUrlInputChange}
              name="url"
              required
            />
            <input id="submitBtn" type="submit" />
          </label>
        </form>
      ) : null}
    </div>
  );
};
