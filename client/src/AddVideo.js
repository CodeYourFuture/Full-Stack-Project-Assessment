import { useState } from "react";

function AddVideo(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.prventDefault();
    if (title.trim() && url.trim()) {
      props.addVideo(title, url);
      setTitle("");
      setUrl("");
    }
  };

  const handleCancel = (e) => {
    setTitle("");
    setUrl("");
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="add-component">
      <h3 className="form-heading">Add Video</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Add Video ...."
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="URL">
            URL
          </label>

          <input
            type="url"
            name="url"
            placeholder="Add URL ..."
            value={url}
            onChange={handleUrl}
          />
        </div>

        <div className="buttons">
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={handleSubmit}
          >
            Add Video
          </button>

          <button
            type="cancel"
            className="btn btn-outline-danger"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
