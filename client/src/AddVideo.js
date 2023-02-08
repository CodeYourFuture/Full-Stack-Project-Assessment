import React from "react";

export default function AddVideo() {
  return (
    <div>
      <h2>Add a video</h2>
      <label>Title:</label>
      <input type="text" name="title" />
      <label>URL:</label>
      <input type="text" name="url" />
      <button type="button" className="btn btn-primary">
        Add
      </button>
    </div>
  );
}
