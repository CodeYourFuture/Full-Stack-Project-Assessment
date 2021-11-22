import React from "react";
import DeleteButton from "./DeleteButton";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";


const VideoContainer = () => {
  return (
    <div>
      <div>
        <h4>Video title</h4>
        <div>
          <FaThumbsUp />
          <h3>0 VOTE</h3>
          <FaThumbsDown />
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
