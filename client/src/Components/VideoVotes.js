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
  // let newcount = video.likecount;
  // const [videoLike, setVideoLike] = useState(video.likecount);
  const [videoDislike, setVideoDislike] = useState(video.dislikecount);
  function handleDelete(id) {
    fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setIsDataUpdating(!isDataUpdating));
  }

  function handleLikeCount(id) {
    console.log("handlelike called");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:5000/like", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch put called");
        console.log(data);
        setIsDataUpdating(!isDataUpdating);
      });
  }

  function handleDislikeCount(id) {
    console.log("handledislike called");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:5000/dislike", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetch put called");
        console.log(data);
        setIsDataUpdating(!isDataUpdating);
      });
  }
  return (
    <div className="d-flex justify-content-center align-content-center m-5">
      <div className="d-flex  m-4">
        <p className="mr-4">{video.likecount}</p>
        <button
          className="d-flex btn btn-outline-danger"
          aria-label="like button"
        >
          <HeartFill
            // color="red"
            size={30}
            onClick={() => handleLikeCount(video.id)}
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
            onClick={() => handleDislikeCount(video.id)}
          />
        </button>
        {/* <ThumbDownIcon
          fontSize="large"
          onClick={() => setVideoDislike(videoDislike + 1)}
        /> */}
        <p className="ml-4">{video.dislikecount}</p>
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
