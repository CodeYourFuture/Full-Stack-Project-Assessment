import React, { useState } from "react";

function AddVideo(props) {
  const [message, setMessage] = useState("");

  const REGEXP =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtube\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const isValidYoutubeUrl = (link) => {
    return link.trim().match(REGEXP) !== null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.title.value.trim() === "") {
      setMessage("Please enter title.");
    } else if (!isValidYoutubeUrl(event.target.videourl.value.trim())) {
      setMessage("Please enter a valid Youtube link.");
    } else {
      setMessage("");
      props.handleSubmit(event);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row gy-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="title"
            required=""
            aria-label="Enter title"
            onChange={props.handleChange}
            value={props.reqBody.title}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="videourl" className="form-label">
            YouTube URL
          </label>
          <input
            type="text"
            name="videourl"
            id="videourl"
            className="form-control"
            placeholder="YouTube url"
            required=""
            aria-label="Enter YouTube url"
            onChange={props.handleChange}
            value={props.reqBody.videourl}
          />
        </div>
      </div>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary shadow">
          Add
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-secondary shadow"
          onClick={props.handleCancel}
        >
          Cancel
        </button>
        &nbsp;
      </div>
      <br />
      {message !== "" ? (
        <span className="alert alert-warning">{message}</span>
      ) : (
        ""
      )}
    </form>
  );
}

export default AddVideo;
