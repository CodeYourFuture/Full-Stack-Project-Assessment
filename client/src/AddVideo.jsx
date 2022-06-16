import React, { useState } from "react";
import "./App.css";
const AddVideo = () => {
  const [visibility, setVisibility] = useState("addingOptionHidden");
  const [clicked, setClicked] = useState(true);
  const [urlValue, setUrlValue] = useState("");
  const [title, setTitle] = useState("");
  const eventHandler = () => {
    setClicked(!clicked);
    !clicked
      ? setVisibility("addingOptionHidden")
      : setVisibility("addingOptionVisible");
    setTitle("");
    setUrlValue("");
  };
  const addingVideo = () => {
    if (title === "") {
      alert("Title is empty!!");
    } else if (!urlValue.includes("youtube") || !urlValue.includes("watch")) {
      alert("Url is not valid!!");
    } else {
      alert("Video added");
      setUrlValue("");
      setTitle("");
    }
  };

  return (
    <div className="Add_Video">
      <button onClick={eventHandler}>Add Video</button>
      <div className={visibility}>
        <text>Title</text>
        <input value={title} onChange={(e) => setTitle(e.value)}></input>
        <text>URL</text>
        <input
          type="text"
          value={urlValue}
          onChange={(e) => setUrlValue(e.value)}
        ></input>
        <button onClick={eventHandler}>Cancel</button>
        <button onClick={addingVideo}>Add</button>
      </div>
    </div>
  );
};

export default AddVideo;
