import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

function AddVideo(props) {
    const forceUpdate = useForceUpdate();
    const simpleValidator = useRef(new SimpleReactValidator());
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

      const videoObjValid = simpleValidator.current.allValid();
      if (videoObjValid) {
        props.createVideo(videoObj);
        setVideoTitleInput("");
        setVideoUrlInput("");
      } else{
        simpleValidator.current.showMessages();
        forceUpdate();
      }
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
              name="videoTitle"
              className="form-control"
              type="text"
              value={videoTitleInput}
              onChange={handleTitleChange}
            />
          </label>

          {simpleValidator.current.message(
            "videoTitle",
            videoTitleInput,
            "required"
          )}
        </div>

        <div className="add-url">
          <label>
            URL
            <input
              name="videoUrl"
              className="form-control"
              type="url"
              placeholder="https://example.com"
              value={videoUrlInput}
              onChange={handleUrlChange}
            />
          </label>
          {simpleValidator.current.message(
            "videoUrl",
            videoUrlInput,
            "required|url"
          )}
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