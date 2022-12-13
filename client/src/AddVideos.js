import React, { useState } from "react";
import AddButton from "./buttons/AddButton";

function AddVideos({ likes, addVideos }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Sending data to server");
    let vidInfo = {
      id: `${url.slice(url.indexOf("=") + 1)}`,
      title: title,
      url: url,
      rating: 0,
    };
    addVideos(vidInfo);
  }

  return (
    <div className="col">
      <form className="form-group add-box" onSubmit={handleSubmit}>
        <label htmlFor="addVideo">Add Video and URL Here</label>
        <div className="addVideo-inform">
          <input
            type="text"
            id="addTitle"
            className="form-control"
            placeholder="Insert Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            id="addUrl"
            className="form-control"
            placeholder="Insert Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <AddButton />
        </div>
      </form>
    </div>
  );
}

export default AddVideos;
