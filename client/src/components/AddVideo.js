import React, { useState } from "react";

function AddVideo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, url, rating: 0 });
  };

  return (
    <div className="card mt-5 mb-5 p-4 add-video-card">
      {" "}
      <div className="card-header">
        Add a Video
        <button
          className="btn btn-primary ml-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Open" : "Close"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="card-body pt-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Video
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2 mt-3"
              onClick={() => {
                setTitle("");
                setUrl("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddVideo;
