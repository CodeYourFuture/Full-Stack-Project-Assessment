import React, { useState } from "react";

export default function AddVideo(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = () => {
    props.addVideo(title, url);
    setTitle("");
    setUrl("");
  };

  const cancelHandler = (e) => {
    setTitle("");
    setUrl("");
  };

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const urlHandler = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div>
      <h3>Add Video</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            name="title"
            placeholder="Add video title.."
            value={title}
            onChange={titleHandler}
          ></input>
        </label>
        <br />
        <label htmlFor="URL">
          URL
          <input
            type="url"
            name="url"
            placeholder="Add URL.."
            value={url}
            onChange={urlHandler}
          ></input>
        </label>
      </form>
      <br />
      <button onClick={submitHandler}>Add Video</button>
      <button onClick={cancelHandler}>Cancel</button>
    </div>
  );
}
