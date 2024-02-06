import React, { useState } from "react";
import moment from "moment";

function AddVideo(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeUrl = (event) => {
    setUrl(event.target.value);
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Video title required!";
    }
    if (!url) {
      validationErrors.url = "Video url required!";
    } else if (!url.includes("youtube.com")) {
      validationErrors.url = "Video url is not valid youtube link!";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let date = moment().format("ll");
      props.addVideo(title, url, date);
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div className="add-video">
      <form id={title}>
        <div className="form-group">
          <label htmlFor="title">Video Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={changeTitle}
            required
          />
          {errors.title && <span>{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="url">Video URL</label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            onChange={changeUrl}
            required
          />
          {errors.url && <span>{errors.url}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
