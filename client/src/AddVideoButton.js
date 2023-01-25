import React, { useState } from "react";
import "./AddVideoButton.css";

const AddVideoButton = ({
  videoData,
  setVideoData,
  url,
  title,
  setTitle,
  setUrl,
}) => {
  const [isActive, setIsActive] = useState(false);

  const youtubeRegex =
    /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

  const isYoutubeUrl = youtubeRegex.test(url);

  // handle button press to add new video
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (title.length > 0 && url.length > 0 && isYoutubeUrl) {
      const video = {
        title,
        url,
        rating: 0,
        // datePosted: new Date().toLocaleString(),
      };
      // Fetch logic to post
      // "http://localhost:5000/"
      // "https://full-stack-project-assessment-server.onrender.com/"
      fetch(
        "https://full-stack-project-assessment-server.onrender.com/",
        {
          method: "POST",
          body: JSON.stringify(video),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setVideoData([...videoData, data]);
          fetch(
            "https://full-stack-project-assessment-server.onrender.com/"
          )
            .then((res) => res.json())
            .then((result) => {
              setVideoData(result);
              setTitle("");
              setUrl("");
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      setTitle("");
      setUrl("");
    } else {
      return alert(
        "Please ensure that all fields are filled in and that you're using a valid youtube video link."
      );
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
            type="text"
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
