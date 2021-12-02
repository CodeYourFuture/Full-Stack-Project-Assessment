import React, { useState } from "react";

const AddVideo = ({ handleAddVideo }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="add-btn">
      <button className="btn btn-secondary" onClick={() => setIsClicked(true)}>
        Add Videos
      </button>
      <div className={isClicked ? " d-block" : "d-none"}>
        <div className="add-form">
          <div>
            <label>
              Title{" "}
              <input
                name="title"
                placeholder=" Video Title"
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              URL{" "}
              <input
                name="vurl"
                placeholder="Video URL"
                onChange={(event) => setUrl(event.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <button
              className="btn btn-warning m-2"
              onClick={() => setIsClicked(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleAddVideo(title, url)}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
