import React, { useState } from "react";

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setTitle("");
    setUrl("");
  };

  const isYouTubeURL = (inputURL) => {
    const youTubePattern = /^https:\/\/www.youtube.com\/watch\?v=.+$/;
    return youTubePattern.test(inputURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isYouTubeURL(url)) {
      onAddVideo(title, url, clearForm);
    } else {
      alert("Please enter a valid YouTube URL");
      clearForm();
    }
  };

  return (
    <div className="add-video">
      <h3>Add a Video</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add Video</button>{" "}
      </form>
    </div>
  );
};


export default AddVideo;
