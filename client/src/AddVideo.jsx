import React, { useState } from "react";
import "./App.css";
const AddVideo = () => {
  let className = "addingOptionVisible"
     const [clicked, setClicked] = useState(false);
     const eventHandler = () => {
       setClicked(!clicked);
         !clicked
           ? (className = "addingOptionHidden")
           : (className = "addingOptionVisible");
     };
  return (
    <div>
      <button onClick={eventHandler} href="#">
        Add Video
      </button>
      <div className={className}>
        <text>Title</text>
        <input></input>
        <text>URL</text>
        <input></input>
        <button>Cancel</button>
        <button>Add</button>
      </div>
    </div>
  );
};

export default AddVideo;
