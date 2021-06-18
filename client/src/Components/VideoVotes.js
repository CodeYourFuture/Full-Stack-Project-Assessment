import React, { useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
// import { HandThumbsDown } from "bootstrap-icons-react";
import { ArrowRight } from "react-bootstrap-icons";
import { HeartFill } from "react-bootstrap-icons";
import { HandThumbsDownFill } from "react-bootstrap-icons";

const VideoVotes = ({
  video,
  videoData,
  setVideoData,
  setIsDataUpdating,
  isDataUpdating,
}) => {
  const [videoLike, setVideoLike] = useState(video.like);
  const [videoDislike, setVideoDislike] = useState(video.dislike);
  function handleDelete(id) {
    // const filteredData = videoData.filter((da) => {
    //   return da.id !== id;
    // });
    // console.log(filteredData);
    // setVideoData(filteredData);
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setIsDataUpdating(!isDataUpdating));
  }

  return (
    <div className="d-flex justify-content-center align-content-center m-5">
      <div className="d-flex  m-4">
        <p className="mr-4">{videoLike}</p>
        <button
          className="d-flex btn btn-outline-danger"
          aria-label="like button"
        >
          <HeartFill
            // color="red"
            size={30}
            onClick={() => setVideoLike(videoLike + 1)}
          />
        </button>
      </div>
      <div className="d-flex m-4">
        <button
          className="d-flex btn btn-outline-primary"
          aria-label="dislike button"
        >
          <HandThumbsDownFill
            size={30}
            onClick={() => setVideoDislike(videoDislike + 1)}
          />
        </button>
        {/* <ThumbDownIcon
          fontSize="large"
          onClick={() => setVideoDislike(videoDislike + 1)}
        /> */}
        <p className="ml-4">{videoDislike}</p>
      </div>
      <div className="d-flex m-4">
        <button
          className="d-flex btn btn-outline-danger font-weight-bold"
          onClick={() => handleDelete(video.id)}
          aria-label="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoVotes;
