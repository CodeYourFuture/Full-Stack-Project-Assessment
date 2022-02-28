import React from "react";

export default function DeleteButton({ deleteVideo, videoId }) {
  return (
    <button
      onClick={() => deleteVideo(videoId)}
      type="button"
      className="btn btn-danger"
    >
      Delete Video
    </button>
  );
}
