import React, { useState } from "react";
import DisplayVideos from "./DisplayVideos";
import './SubmitVideo.css';

const SubmitVideo = ({ data, setData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [showAddVideo, setShowAddVideo] = useState(false);

  function isValidYouTubeUrl(url) {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return regExp.test(url);
  }

  const addVideo = (e) => {
    e.preventDefault();
    let newVideo = {
      id: Date.now(),
      title: title,
      url: url,
      rating: rating,
    };
    let tempData = [...data, newVideo];

    if (newVideo.title === "") {
      alert("Please enter a valid title");
    }
    if (newVideo.url === "") {
      alert("Please enter a valid url");
    } else if (!isValidYouTubeUrl(newVideo.url)) {
      alert("Please enter a valid url");
    } else {
      setData(tempData);
    }
    setTitle("");
    setUrl("");
  };
  const cancelAddVideo = () => {
    setShowAddVideo(!showAddVideo);
  };

  let content =<h3>Add Video</h3>;
  if (showAddVideo) {
    content = (<DisplayVideos />)
  }

  return (
    <div className="Add-video Forms-container">
      <form className="Add-form forms">
        {/* <h2>Add Video</h2> */}
        <div>{content}</div>
        <label htmlFor="title" className="labels">
          Title
          <input
            type="text"
            name="title"
            placeholder=" Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </label>
        <label className="labels" htmlFor="link">
          URL
          <input
            type="text"
            name="link"
            placeholder=" Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
        </label>
        <div className="buttons">
          <button type="submit" onClick={addVideo}>
            Add
          </button>
          <button onClick={cancelAddVideo}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitVideo;
