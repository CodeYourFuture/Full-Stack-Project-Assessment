import React from "react";

const VideoAddingButtons = ({ clicked, setClicked, videos, setVideos }) => {
  const handleCancelClick = () => {
    setClicked(false);
  };
  return (
    <div>
      <button
        className="btn btn-warning input"
        type="cancel"
        onClick={handleCancelClick}
      >
        Cancel
      </button>
      <button className="btn btn-danger input" type="submit">
        ADD
      </button>
    </div>
  );
};

export default VideoAddingButtons;
