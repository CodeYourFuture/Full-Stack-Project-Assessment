import React, { useState } from "react";
import './App.css'

const SingleVideo = ({ index, video, videos, setVideos}) => {
  const videoId = video.url.slice(-11);
  const startingScore = video.rating;
  const [score, setScore] = useState(startingScore);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  console.log(video)
  const deleteVideo = () => {
    setVideos(videos.filter((video) => video.id !== videos[index].id));
    
  };
  return (
    <div>
      <p className="video-title">{video.title}</p>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {video.dateAdded && <p>This video was uploaded on {video.dateAdded}</p>}
      <p>Votes: {score}</p>
      <button
        className={liked ? "liked" : "button"}
        onClick={
          () => {
            if (score < startingScore) {
              setScore((score) => score);
            } else if (score === startingScore) {
              setLiked(true);
              setScore((score) => (score += 1));
            } else {
              setLiked(false);
              setScore((score) => (score -= 1));
            }
          }
        }
      >
        Up vote
      </button>
      <button
        className={disliked ? "disliked" : "button"}
        onClick={
          () => {
            if (score > startingScore) {
              setScore((score) => score);
            } else if (score === startingScore) {
              setDisliked(true);
              setScore((score) => (score -= 1));
            } else {
              setDisliked(false);
              setScore((score) => (score += 1));
            }
          } 
        }
      >
        Down vote
      </button>
      <button id={video.id} onClick={deleteVideo}>
        Remove Video
      </button>
    </div>
  );
};

export default SingleVideo;
