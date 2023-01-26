import React from "react";

function AddVideo(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row gy-3">
        <div className="col-md-6">
          <label for="cc-name" className="form-label">
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
          <label for="cc-number" className="form-label">
            YouTube URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            className="form-control"
            placeholder="YouTube url"
            required=""
            aria-label="Enter YouTube url"
            onChange={props.handleChange}
            value={props.reqBody.url}
          />
        </div>
      </div>
      <br />
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
    </form>
  );
}

export default AddVideo;
