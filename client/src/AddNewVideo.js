import React, { useState } from "react";

const AddNewVideo = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    //Increasing of each video ID
    const newId = (id) => {
      return id++;
    };
    const addVideo = {
      title,
      url,
      id: { newId },
      rating: 5,
    };

    props.setVideoData((allVideos) => {
      return allVideos.concat(addVideo);
    });
    setTitle("");
    setUrl("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleOnSubmit}>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Add URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <div className="btn-form">
          <div className="button1">
            <button
              onClick={() => props.setAddVideo(false)}
              type="cancel"
              className="btn btn-warning"
            >
              Cancel
            </button>
            <button type="add" className="btn btn-danger">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewVideo;
