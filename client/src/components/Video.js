import React from "react";

function Video() {
  return (
    <div className="video">
      <h2>Video title</h2>

      <p>embedded video</p>

      <div className="votes">
        <button>up</button>
        <p>number of votes</p>
        <button>down</button>
      </div>
      <button>remove</button>
    </div>
  );
}

export default Video;
