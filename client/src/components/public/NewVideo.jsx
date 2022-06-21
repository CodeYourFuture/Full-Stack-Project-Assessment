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
          <h2 className="new_video_header">Add a New Video:</h2>
        </div>
        <div>
          <input
            className="url_input"
            value={videoInfo.url}
            type="text"
            placeholder="URL..."
            onChange={(e) => handleChange("url", e.target.value)}
          />
        </div>
        <div>
          <input
            className="title_input"
            value={videoInfo.title}
            type="text"
            placeholder="Title..."
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div>
          <input
            className="rating_input"
            value={videoInfo.rating}
            type="text"
            placeholder="Rating..."
            onChange={(e) => handleChange("rating", e.target.value)}
          />
        </div>
        <div>
          <button className="submit_btn" type="submit">
            Add
          </button>
        </div>
        <div>
          <button
            className="cancel_btn"
            type="button"
            onClick={() => setNewVideo(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default NewVideo;
