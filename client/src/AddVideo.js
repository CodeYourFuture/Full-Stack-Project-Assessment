import React, { useState } from "react";

function AddVideo({ setVideos, setCount }) {
  const [addVideoTitle, setAddVideoTitle] = useState("");
  const [addVideoUrl, setAddVideoUrl] = useState("");

  function handleTitleChange(event) {
    setAddVideoTitle(event.target.value);
  }

  function handleUrlChange(event) {
    setAddVideoUrl(event.target.value);
  }

  async function addVideo(event) {
    event.preventDefault();

    // basic validation for title and URL
    const trimmedTitle = addVideoTitle.trim();
    const trimmedUrl = addVideoUrl.trim();
    // checking if input is empty after trimming when add is clicked ---> Don't understand the double trimming??
    if (!trimmedTitle || !trimmedUrl) {
      alert("Title and URL are required");
      return;
    }

    // add validation to check if URL is valid youtube URL or not

    const newVideo = {
      title: trimmedTitle,
      url: trimmedUrl,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        const { id: newVideoId } = await response.json();
        setVideos((videos) => [...videos, { id: newVideoId, ...newVideo }]);
        setCount((prevCount) => prevCount + 1); // count to change when button clicked to let react know to rebuild
        // empty input fields after video added
        setAddVideoTitle("");
        setAddVideoUrl("");
      } else {
        console.error("Failed to add video");
      }
    } catch (error) {
      console.error("Error adding video:", error);
    }
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
          />
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
          />
        </div>
        <div>
          <button type="button" onClick={() => setAddVideoTitle("")}>
            Cancel
          </button>
          <button type="submit" onClick={addVideo}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
