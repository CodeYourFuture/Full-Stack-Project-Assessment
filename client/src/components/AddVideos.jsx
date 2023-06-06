import React, { useState } from "react";

function AddVideos({ videoData }) {
  const [form, setForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showForm = () => {
    setForm(!form);
    setErrorMessage("");
  };

  const addVideo = (event) => {
    event.preventDefault();

    const checkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    if (!checkRegex.test(url)) {
      setErrorMessage("Please check the video URL");
      setTitle("");
      setUrl("");
      return;
    }

    const newVideoData = {
      title,
      url,
    };
    videoData(newVideoData);
    showForm();
    setTitle("");
    setUrl("");
  };

  return (
    <div className="AddVideos">
      {form ? (
        <form onSubmit={addVideo}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <div>
            <button type="button" onClick={showForm}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={showForm}>
          Add Video
        </button>
      )}
    </div>
  );
}

export default AddVideos;
