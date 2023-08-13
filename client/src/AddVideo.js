import React, { useState } from "react";

// React component that will add a Video.
// It should include fields to add a
// Title
// Url
// When a button is clicked the video should be added to the list

function AddVideo({ filterVideos, setFilterVideos }) {
  const [addVideoTitle, setAddVideoTitle] = useState("");
  const [addVideoUrl, setAddVideoUrl] = useState("");

  function handleSubmitTitle(event) {
    //////// HELP! I keep getting 'Uncaught TypeError: Cannot read properties of undefined (reading 'value')'
    setAddVideoTitle(event.target.value);
    // setAddVideoUrl(event.target.value);
  }
  function handleSubmitUrl(event) {
    //  setAddVideoTitle(event.target.value);
    setAddVideoUrl(event.target.value);
  }

  function addVideo() {
    const addVideoObject = {};
    // addVideoObject.id = addVideoId; //////// HELP! How can I find out highest ID and then add to that?
    addVideoObject.title = addVideoTitle;
    addVideoObject.url = addVideoUrl;
    setFilterVideos((filterVideos) => [...filterVideos, addVideoObject]);
  }

  return (
    <div className="add-video">
      <h3>Add Video</h3>
      <form
        className="add-video-form"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitTitle(addVideoTitle);
          handleSubmitUrl(addVideoUrl);
        }}
      >
        <div>
          <label>Title</label>
          <input
            id="video-title-input"
            name="video-title"
            type="text"
            required=""
            value={addVideoTitle}
            onChange={handleSubmitTitle}
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
            onChange={handleSubmitUrl}
          ></input>
        </div>
        <div>
          <button type="cancel">Cancel</button>
          <button type="submit" onClick={addVideo}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
