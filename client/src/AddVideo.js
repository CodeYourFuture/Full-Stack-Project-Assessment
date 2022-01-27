import React from "react";

export default function AddVideo() {
  return (
    <div>
      <h3>Add Video</h3>
      <label for="title"></label>
      Title
      <input type="text"></input>
      <br />
      <label for="URL"></label>
      URL
      <input type="text"></input>
      <br />
      <button>Add Video</button>
      <button>Cancel</button>
    </div>
  );
}
