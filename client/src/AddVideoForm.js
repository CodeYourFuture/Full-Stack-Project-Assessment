import React from "react";

function AddVideoForm(props) {
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && url.trim()) {
      props.addVideo(title, url);
      setTitle("");
      setUrl("");
    }
  };

  const handleDelete = (e) => {
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
    <div className="add-video-container">
      <div>
        {" "}
        <button className="h2">Add Video</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Add video title..."
          value={title}
          onChange={handleTitle}
        />

        <label htmlFor="url">Url</label>
        <input
          className="form-input"
          type="url"
          name="url"
          placeholder="Add URL..."
          value={url}
          onChange={handleUrl}
        />

        <div className="buttons">
          <button id="btn-add-video" onClick={handleSubmit}>
            Add Video
          </button>
          <button id="btn-remove-video" onClick={handleDelete}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideoForm;
