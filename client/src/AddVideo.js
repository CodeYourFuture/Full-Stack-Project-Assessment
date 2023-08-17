import React, { useState } from "react";

function AddVideo(props) {
    const [videoTitleInput, setVideoTitleInput] = useState("");
    const [videoUrlInput, setVideoUrlInput] = useState("");

    function handleTitleChange(event) {
      setVideoTitleInput(event.target.value);
    }

    function handleUrlChange(event) {
      setVideoUrlInput(event.target.value);
    }

    function addVideoObj() {
      const videoObj = {title: videoTitleInput, url: videoUrlInput};
      props.AddVideo(videoObj);
      setVideoTitleInput("");
      setVideoUrlInput("");
    }

    function handleReset() {
      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );
      setVideoTitleInput("");
      setVideoUrlInput("");
    };

    return (
      <div className="add-video-container">
        <div className="form-group">
          <label>
            TITLE
            <input
              className="form-control"
              type="text"
              value={videoTitleInput}
              onChange={handleTitleChange}
            />
          </label>
        </div>

        <div className="add-url">
          <label>
            URL
            <input
              className="form-control"
              type="url"
              placeholder="https://example.com"
              value={videoUrlInput}
              onChange={handleUrlChange}
            />
          </label>
        </div>

        <div className="buttons-container">
          <div className="add-button">
            <button
              type="button"
              className=" btn add-video-buttons add-btn"
              onClick={addVideoObj}
            >
              Add
            </button>
          </div>

          <div className="cancel-button">
            <button
              type="button"
              className="btn add-video-buttons reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
}

export default AddVideo;