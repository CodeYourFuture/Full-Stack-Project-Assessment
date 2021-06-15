import React, { useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const VideoVotes = ({ video, videoData, setVideoData }) => {
  const [videoLike, setVideoLike] = useState(video.like);
  const [videoDislike, setVideoDislike] = useState(video.dislike);
  function handleDelete(id) {
    const filteredData = videoData.filter((da) => {
      return da.id !== id;
    });
    console.log(filteredData);
    setVideoData(filteredData);
  }
  return (
    <div className="d-flex justify-content-center align-content-center m-5">
      <div className="d-flex  m-4">
        <p className="mr-4">{videoLike}</p>
        <ThumbUpAltIcon
          fontSize="large"
          onClick={() => setVideoLike(videoLike + 1)}
        />
      </div>
      <div className="d-flex m-4">
        <ThumbDownIcon
          fontSize="large"
          onClick={() => setVideoDislike(videoDislike + 1)}
        />
        <p className="ml-4">{videoDislike}</p>
      </div>
      <div className="d-flex m-4">
        <button
          className="d-flex btn btn-primary"
          onClick={() => handleDelete(video.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoVotes;
