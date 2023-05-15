import React from "react";
import "./TopBar.css";

function TopBar() {
  return (
    <div className="top-bar">
      <div className="input-top">
        <label htmlFor="titleInput">Title</label>
        <input placeholder="Title" id="titleInput" type="text" />
      </div>
      <div className="input-top">
        <label htmlFor="urlInput">URL</label>
        <input placeholder="URL" id="urlInput" type="text" />
      </div>
      <button>ADD</button>
    </div>
  );
}

export default TopBar;
