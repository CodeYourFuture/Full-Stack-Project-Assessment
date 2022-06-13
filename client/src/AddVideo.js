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
      this.setState({
        itemvalues: [{}],
      });
    };

    return (
      <div className="add-video-container">
        <div className="add-video-title">
          <label>
            Title
            <input
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
              type="url"
              placeholder="https://example.com"
              value={videoUrlInput}
              onChange={handleUrlChange}
            />
          </label>
        </div>

        <div className="add-cancel-buttons-container">
          <div className="add-button">
            <button onClick={addVideoObj}>ADD</button>
          </div>

          <div className="cancel-button">
            <button onClick={handleReset}>RESET</button>
          </div>
        </div>
      </div>
    );
}

export default AddVideo;