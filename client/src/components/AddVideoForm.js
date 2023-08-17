import React from "react";

export default function AddVideoForm() {
  function handleAddVideo() {
    console.log("video added");
  }

  return (
    <div className="form">
      <input type="text" placeholder="Title" className="form--input" />
      <input type="text" placeholder="url" className="form--input" />
      <button onClick={handleAddVideo} className="form--button">
        Add New Video
      </button>
    </div>
  );
}
