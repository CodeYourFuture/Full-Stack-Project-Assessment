import React, { useState, useEffect } from "react";
import DeleteButton from "./buttons/DeleteButton";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import "./videoCard.css";

function VideoCard({ video_detail, handleRating, handleDelete }) {
  const [voteCount, setVoteCount] = useState(0);
  const [video, setVideo] = useState({});

  useEffect(() => {
    let videourl = video_detail.videourl.replace("watch?v=", "embed/");
    setVoteCount(video_detail.rating);
    setVideo({ ...video_detail, videourl });
  }, [video_detail]);

  function likeVote() {
    let rating = voteCount + 1;
    setVoteCount(rating);
    handleRating(video.id, rating);
  }

  function disLikeVote() {
    let rating = voteCount - 1 <= 0 ? 0 : voteCount - 1;
    setVoteCount(rating);
    handleRating(video.id, rating);
  }

  return (
    <div className="card h-100 rounded shadow">
      <iframe
        title={video.title}
        src={video.videourl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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
