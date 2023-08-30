import React, { useState } from "react";

function AddVideo({ onAddVideo }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [Error, setError] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const validUrl = (inputUrl) => {
    return inputUrl.match(
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&\S+)?$/
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title"); //title error handling
    } else if (!validUrl(url)) {
      setError("Please enter a valid YouTube URL"); //url error handling
    } else {
      onAddVideo({ title, url });
      setTitle("");
      setUrl("");
    }
  };

  return (
    <>
      <div className="text-center">
        <h2>Add Your Video Here</h2>
      </div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "20vh" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="form form-row align-items-center">
            <div className="col-auto">
              <label className="sr-only" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="title"
                placeholder="Enter a title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="col-auto">
              <label className="sr-only" htmlFor="url">
                Add Video URL
              </label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">URL</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder="Video URL"
                  onChange={handleUrlChange}
                />
              </div>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {Error && <div className="text-center text-danger">{Error}</div>}
    </>
  );
}

export default AddVideo;
