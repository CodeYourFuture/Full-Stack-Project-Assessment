import React, { useState, useEffect } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import "./videoCard.css";

function VideoCard({ video_detail, handleDelete, onThumbsDown }) {
  const [voteCount, setVoteCount] = useState(0);
  const [video, setVideo] = useState({});

  useEffect(() => {
    let url = video_detail.url.replace("watch?v=", "embed/");
    setVoteCount(video_detail.rating);
    setVideo({ ...video_detail, url });
  }, [video_detail]);

  function likeVote() {
    setVoteCount((voteCount) => voteCount + 1);
  }

  function disLikeVote() {
    setVoteCount((voteCount) => (voteCount === 0 ? voteCount : voteCount - 1));
  }

  return (
    <div className="card">
      <iframe
        title={video.title}
        src={video.url}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="card-body">
        <div className="card-title">
          <p className="h5">{video.title}</p>
        </div>
        <div className="d-flex justify-content-between flex-row w-100">
          <div className="d-flex justify-content-start align-items-center">
            <LikeIcon onThumbsUp={() => likeVote()} />
            &nbsp;
            <div>{voteCount}</div>
            &nbsp;
            <DislikeIcon onThumbsDown={() => disLikeVote()} />
          </div>
          <div className="d-flex justify-content-end">
            <DeleteButton onDelete={() => handleDelete()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
