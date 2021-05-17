import React, { useState } from "react";
const AddVideo = () => {
  const [click, setClick] = useState(false);

  return (
    <div className="add-video-container">
      <h5
        onClick={() => {
          setClick(true);
        }}
      >
        Add Video
      </h5>
      {click ? (
        <div className="add-video">
          <p>Title</p>
          <input></input>
          <p>URL</p>
          <input></input>
          <div className="add-video-buttons">
            <button className="btn btn-primary" onClick={() => setClick(false)}>
              cancel
            </button>
            <button className="btn btn-primary">Add </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default AddVideo;
