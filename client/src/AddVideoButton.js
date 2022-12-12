import React, { useState } from "react";

const AddVideoButton = ({ videoData, setVideoData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // handle button press to add new video
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const video = {
      id: new Date().getTime().toString(),
      title,
      url,
      rating: 0,
    };
    setVideoData((videoData) => {
      return [...videoData, video];
    });
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="formContainer">
        <button className="titleButton">Add Video</button>
        <div className="formInputs">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="addVideoInput m-1 p-1"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="url">URL</label>
          <input
            type="text"
            className="addVideoInput m-1 p-1 "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="addVideoButtons">
          <button
            value="add"
            type="submit"
            className="btn btn-primary mx-1 mt-1"
          >
            ADD
          </button>
          <button
            value="cancel"
            type="submit"
            className="btn btn-primary mx-1 mt-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddVideoButton;
