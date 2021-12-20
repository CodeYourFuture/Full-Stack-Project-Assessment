import React, { useState } from "react";

const AddVideo = ({ addVideoForm, videoList, setVideoList }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newVideo = {
      title: title,
      url: url,
      rating: 0,
    };

    setVideoList(() => [...videoList, newVideo]);
    setTitle("");
    setUrl("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  return (
    <div>
      {addVideoForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Type to add your video title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <label>
            URL
            <input
              type="url"
              name="url"
              placeholder="Add the Video URL"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
          <button>Add Your Video Title</button>
        </form>
      )}
    </div>
  );
};

export default AddVideo;
