import React, { useState } from "react";
import "./NewVideoContainer.css";

function NewVideoContainer({ allMovies, setAllMovies }) {
  const [newTitle, setNewTitle] = useState("");
  const [newURL, setNewURL] = useState("");
  function addNewVideo() {
    console.log("button clicked");
    const newRec = {};
    let maxId = Math.max(...allMovies.map((movie) => movie.id));
    const newId = maxId + 1;
    newRec.id = newId;
    newRec.title = newTitle;
    newRec.url = newURL;
    newRec.rating = 0;
    setAllMovies((oldArray) => [...oldArray, newRec]);
  }

  return (
    <div className="new-video-container">
      <label htmlFor="newTitle">Title: </label>
      <input type="text" id="newTitle" name="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}></input>
      <br />
      <label htmlFor="newURL">URL: </label>
      <input type="text" id="newURL" name="newURL" value={newURL} onChange={(e) => setNewURL(e.target.value)}></input>
      <br />
      <button className="add-button" onClick={addNewVideo}>
        Add Video
      </button>
    </div>
  );
}

export default NewVideoContainer;
