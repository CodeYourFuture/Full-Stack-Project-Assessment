import React, { useState } from "react";

const AddNewVideo = ({setVideoData, setAddVideo, urlToFetch, createVideo}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

const handleOnSubmit = async event => {
  event.preventDefault();
  const res = await fetch(`${urlToFetch}`, {
    method: "post",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ title, url }),
  });
  const data = await res.text();
  console.log(data);
    setTitle("");
    setUrl("");
    createVideo();
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
              onClick={() => setAddVideo(false)}
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
