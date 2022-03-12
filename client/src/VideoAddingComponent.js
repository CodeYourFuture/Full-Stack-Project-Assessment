import React, { useState } from "react";
import AddVideo from "./AddVideo";

const VideoAddingComponent = ({ videos, setVideos }) => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    const isClicked = !clicked;
    setClicked(isClicked);
  };
  return (
    <div>
      <button className="btn btn-primary mt-5" onClick={handleClick}>
        Add Video
      </button>
      {clicked ? (
        <AddVideo
          setClicked={setClicked}
          setVideos={setVideos}
          videos={videos}
        />
      ) : null}
    </div>
  );
};

export default VideoAddingComponent;
