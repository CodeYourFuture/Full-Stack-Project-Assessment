import React, { useState } from "react";

export default function AddVideo({ data, setData }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddVideo = (title, url) => {
    const newVideoData = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      url: url,
      rating: 0,
    };

    setData([...data, newVideoData]);
  };
  return (
    <div className="add-btn">
      <div className=" d-block">
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
}