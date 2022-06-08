import React, { useContext } from "react";
import "../../styles/newvideo.css";
import UserContext from "../../context/UserContext";

const NewVideo = () => {
  const { setNewVideo, videoInfo, handleChange, handleSubmit } =
    useContext(UserContext);
  return (
    <article className="newvideo_container">
      <form>
        <div>
          <h2>Add a New Video:</h2>
        </div>
        <div>
          <input
            value={videoInfo.link}
            type="text"
            placeholder="enter URL"
            onChange={(e) => handleChange("link", e.target.value)}
          />
        </div>
        <div>
          <input
            value={videoInfo.name}
            type="text"
            placeholder="Add Video Title"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <button onSubmit={handleSubmit}>Add</button>
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
