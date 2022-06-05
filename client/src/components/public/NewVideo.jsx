import React, { useContext } from "react";
import "../../styles/newvideo.css";
import UserContext from "../../context/UserContext";

const NewVideo = () => {
  const { setNewVideo } = useContext(UserContext);
  return (
    <article className="newvideo_container">
      <>
        <input />
        <input />
        <button
          type="button"
          onClick={() => setNewVideo(false)}
          className="cancel_btn"
        >
          Cancel
        </button>
      </>
    </article>
  );
};

export default NewVideo;
