import React, { useState } from "react";

function AddVideo(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && url.trim()) {
      props.addVideo(title, url);
      setTitle("");
      setUrl("");
    }
  };
  const cancelHandler = (e) => {
   
  };
  const titleHandler = (e) => {
    
  };
  const urlHandler = (e) => {
    
  };
  return (
    <div className="add-component">
      <h3 className="form-heading">Add Video</h3>
      <form className="form" onSubmit= >
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Add video title.."
            value={title}
            onChange=
          ></input>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="URL">
            URL
          </label>
          <input
            type="url"
            name="url"
            placeholder="Add URL.."
            value={url}
            onChange=
          ></input>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="btn btn-success"
            onClick=
          >
            Add Video
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick=
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;