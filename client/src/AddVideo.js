import React, { useState } from "react";

function AddVideo({ videos, setVideos }) {
  const [addVideoTitle, setAddVideoTitle] = useState("");
  const [addVideoUrl, setAddVideoUrl] = useState("");

  function handleTitleChange(event) {
    setAddVideoTitle(event.target.value);
  }

  function handleUrlChange(event) {
    setAddVideoUrl(event.target.value);
  }

  function addVideo(event) {
    event.preventDefault();
    const addVideoObject = {};
    addVideoObject.id = getId();
    addVideoObject.title = addVideoTitle;
    addVideoObject.url = addVideoUrl;
    setVideos((videos) => [...videos, addVideoObject]);
  }

  function getId() {
    const sortedVideoArray = videos.sort(
      (videoObjectA, videoObjectB) => videoObjectB.id - videoObjectA.id
    );
    return sortedVideoArray[0].id + 1;
  }

  return (
    <div className="add-video">
      <h2>Add Video</h2>
      <form className="add-video-form">
        <div>
          <label htmlFor="video-title-input">Title</label>
          <input
            id="video-title-input"
            name="video-title"
            type="text"
            required=""
            value={addVideoTitle}
            onChange={handleTitleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="video-url-input">URL</label>
          <input
            id="video-url-input"
            name="video-url"
            type="text"
            required=""
            value={addVideoUrl}
            onChange={handleUrlChange}
          ></input>
        </div>
        <div>
          <button type="cancel">Cancel</button>
          <button type="submit" onClick={(event) => addVideo(event)}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
