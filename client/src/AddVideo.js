import React, { useState } from "react";
import "./addVideo.css";

const AddVideo = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeUrl = (e) => setUrl(e.target.value);
  const handleSubmit = () =>{
    props.addVideo(title, url);
    setTitle("");
    setUrl("");
  } 

  return (
    <div className="AddVideoContainer">
      <h2 className="Heading">Add a new video to your Favorite List</h2>
      <div>
        <div className="InputContainer">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
          />
        </div>
        <div className="InputContainer">
          <label htmlFor="url">URL </label>
          <input 
          type="text" 
          id="url"
          name="url"
          value={url}
          onChange={handleChangeUrl} />
        </div>
        <button id="submit" onClick={handleSubmit}>
          Add new video
        </button>
      </div>
    </div>
  );
};

export default AddVideo;
