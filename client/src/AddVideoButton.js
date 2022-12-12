import React, { Fragment, useState } from "react";

const AddVideoButton = ({ videoData, setVideoData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // handle button press to add new video
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.id);
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

  const handleOnClick = () => {
    setTitle("");
    setUrl("");
  };

  return (
    <Fragment>
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
              id="test"
              value="add"
              type="submit"
              className="btn btn-primary mx-1 mt-1"
            >
              ADD
            </button>
            <button
              value="cancel"
              className="btn btn-primary mx-1 mt-1"
              onClick={(e) => {
                e.preventDefault();
                handleOnClick();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default AddVideoButton;
