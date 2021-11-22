import React from "react";
import DeleteButton from "./DeleteButton";

const VideoContainer = () => {
  return (
    <div>
      <div>
        <h4>Video title</h4>
        <div>
          <i class="fas fa-thumbs-up vote"></i>
          <h3>0 VOTE</h3>
          <i class="fas fa-thumbs-down vote"></i>
        </div>
        <div>
          <iframe
            src="https://youtu.be/j942wKiXFu8"
            allowfullscreen=""
            title="YouTube video player"
          ></iframe>
        </div>
        <div>
          <DeleteButton />
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
