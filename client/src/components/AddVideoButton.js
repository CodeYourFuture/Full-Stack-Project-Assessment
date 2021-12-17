import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const AddVideoButton = ({ videoData, setVideoData }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faPlusSquare} size="3x" />
    </div>
  );
};

export default AddVideoButton;
