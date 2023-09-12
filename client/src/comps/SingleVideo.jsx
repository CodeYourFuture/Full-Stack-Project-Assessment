import React, { useState } from "react";
import "../styles/SingleVideo.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function SingleVideo(props) {
  const [likes, setLikes] = useState(props.rating);

  function handleLikes() {
    setLikes((rating) => rating + 1);
    updateVideoRating({ ...props, rating: likes + 1 });
  }

  function handleUnlikes() {
    setLikes((rating) => rating - 1);
    updateVideoRating({ ...props, rating: likes - 1 });
  }

  const updateVideoRating = async (updatedVideo) => {
    fetch(
      `https://full-stack-project-assessment-gb1q.onrender.com/${updatedVideo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: updatedVideo.rating }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Video rating updated");
        } else {
          throw new Error("Failed to update video rating");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteVideo = () => {
    props.onDeleteVideo(props.id);
  };

  return (
    <div className="single-video-card">
      <h4>{props.title}</h4>
      <iframe
        width="400"
        height="215"
        src={props.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="button-likes-container">
        <div className="ratings-container">
          <p>Likes: {likes}</p>
          <div className="emoji-container">
            <p className="up rating-emoji" onClick={handleLikes}>
              <ThumbUpIcon />
            </p>
            <p className="down rating-emoji" onClick={handleUnlikes}>
              <ThumbDownIcon />
            </p>
          </div>
        </div>
        <button onClick={handleDeleteVideo} className="delete-video-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default SingleVideo;
