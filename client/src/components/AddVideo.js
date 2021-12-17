import React, { useState } from "react";
const AddVideo = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVideo = {
      id: Math.floor(Math.random() * 1000 + 1),
      title: title,
      url: url,
      rating: 0,
    };
    setVideos((element) => element.concat(newVideo));
  };
  return (
    <div>
      <form className="addVideo" onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputTitle"
          name="title"
          placeholder="Enter Title Here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          className="inputUrl"
          name="url"
          placeholder="Enter URL Here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="add-btn">
          Add Video
        </button>
      </form>
    </div>
  );
};
export default AddVideo;
