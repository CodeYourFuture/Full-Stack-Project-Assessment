import React, { useState } from "react";
// import AddButton from "./AddButton";

function AddVid({ newVideoData }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="vidAdd-container">
      <p>Add Video</p>
      <div className="vidAdd">
        <form>
          <label for="title">Title:</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <label for="url">URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>
        </form>
      </div>
      {/* <button className="uploadBtn" onClick={addVideo}>
        Upload
      </button> */}
      {/* <AddButton /> */}
    </div>
  );
}

export default AddVid;
