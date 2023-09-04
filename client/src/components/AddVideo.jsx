import React, { useState } from "react";

function AddVideo(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = () => {
    props.addVideo(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <div className="add-video">
      <form>
        <div class="form-group">
          <label for="title">Video Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            value={title}
            onChange={changeTitle}
            required
          />
        </div>
        <div class="form-group">
          <label for="url">Video URL</label>
          <input
            type="text"
            class="form-control"
            id="url"
            value={url}
            onChange={changeUrl}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
