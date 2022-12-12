import React, { Fragment, useState } from "react";
import "./AddVideoButton.css";

const AddVideoButton = ({ videoData, setVideoData }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isActive, setIsActive] = useState(false);

  // handle button press to add new video
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (title.length > 0 && url.length > 0) {
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
    } else {
      return alert("Input fields cannot be empty");
    }
  };

  const handleOnClick = (e) => {
    if (e === "addVideo") {
      setIsActive(true);
    } else {
      setTitle("");
      setUrl("");
      setIsActive(false);
    }
  };

  return (
    <div className="addVideoContainer d-flex flex-column ml-6">
      <button
        value="addVideo"
        className="text-center title_Button"
        onClick={(e) => handleOnClick(e.target.value)}
      >
        Add Video
      </button>
      <form
        className={isActive ? "formContainer" : "hidden"}
        onSubmit={handleOnSubmit}
      >
        <div>
          <div className="input_1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="addVideoInput m-1 p-1"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="input_2"></div>
          <label htmlFor="url">URL</label>
          <input
            type="email"
            className="addVideoInput m-1 p-1 "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <div className="addVideoButtons ">
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
              className="btn btn-danger mx-1 mt-1"
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
    </div>
  );
};

export default AddVideoButton;
