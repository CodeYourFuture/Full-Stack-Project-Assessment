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

    return (
      <div className="add-video-container">
        <div className="add-video-title">
          <p>Title</p>
          <input
            type="text"
            value={videoTitleInput}
            onChange={handleTitleChange}
          />
        </div>

        <div className="add-url">
          <p>URL</p>
          <input
            type="url"
            placeholder="https://example.com"
            value={videoUrlInput}
            onChange={handleUrlChange}
          />
        </div>

        <div className="add-cancel-buttons-container">
          <div className="add-button">
            <button onClick={addVideoObj}>ADD</button>
          </div>

          <div className="cancel-button">
            <button>CANCEL</button>
          </div>
        </div>
      </div>
    );
}

export default AddVideo;