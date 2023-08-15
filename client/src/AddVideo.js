import React, { useState } from "react";

function AddVideo({ filterVideos, setFilterVideos }) {
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
    setFilterVideos((filterVideos) => [...filterVideos, addVideoObject]);
  }

  function getId() {
    const sortedVideoArray = filterVideos.sort(
      (videoObjectA, videoObjectB) => videoObjectB.id - videoObjectA.id
    );
    return sortedVideoArray[0].id + 1;
  }

  return (
    <div className="add-video">
      <h3>Add Video</h3>
      <form className="add-video-form">
        <div>
          <label>Title</label>
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
          <label>URL</label>
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
