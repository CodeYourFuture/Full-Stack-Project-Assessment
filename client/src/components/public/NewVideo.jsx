import React, { useContext } from "react";
import "../../styles/newvideo.css";
import UserContext from "../../context/UserContext";

const NewVideo = () => {
  const { setNewVideo, videoInfo, handleChange, addNewVideoHandler } =
    useContext(UserContext);

  return (
    <article className="newvideo_container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewVideoHandler();
        }}
      >
        <div>
          <h2>Add a New Video:</h2>
        </div>
        <div>
          <input
            value={videoInfo.url}
            type="text"
            placeholder="URL..."
            onChange={(e) => handleChange("url", e.target.value)}
          />
        </div>
        <div>
          <input
            value={videoInfo.title}
            type="text"
            placeholder="Title..."
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div>
          <input
            value={videoInfo.rating}
            type="text"
            placeholder="Rating..."
            onChange={(e) => handleChange("rating", e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setNewVideo(false)}
            className="cancel_btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default NewVideo;
