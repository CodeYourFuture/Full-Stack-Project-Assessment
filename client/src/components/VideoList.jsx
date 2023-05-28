import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaStar, FaTrash } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import AddVideoForm from "./AddVideoForm";
import moment from "moment";
import "./VideoList.css";

const VideoList = ({ videos }) => {
  const [videoList, setVideoList] = useState(videos);
  const [sortedVideoList, setSortedVideoList] = useState([]);

  useEffect(() => {
    const sortedList = [...videoList].sort((a, b) => b.rating - a.rating);
    setSortedVideoList(sortedList);
  }, [videoList]);

  const addVideo = (newVideo) => {
    const timestamp = moment().format("YYYY-MM-DD HH:mm");
    const updatedVideoList = [
      ...videoList,
      { ...newVideo, rating: 0, timestamp },
    ];
    setVideoList(updatedVideoList);
  };

  const removeVideo = (videoId) => {
    const updatedVideoList = videoList.filter((video) => video.id !== videoId);
    setVideoList(updatedVideoList);
  };

  const handleVote = (videoId, voteType) => {
    const updatedVideoList = videoList.map((video) => {
      if (video.id === videoId) {
        if (voteType === "like") {
          return {
            ...video,
            rating: video.rating + 1,
          };
        } else if (voteType === "dislike") {
          return {
            ...video,
            rating: video.rating - 1,
          };
        }
      }
      return video;
    });
    setVideoList(updatedVideoList);
  };

  return (
    <div>
      <h1>Video Recommendation</h1>
      <div className="video-list">
        {sortedVideoList.map((video) => (
          <div key={video.id} className="video-container">
            <div className="player-wrapper">
              <ReactPlayer
                url={video.url}
                controls
                width="100%"
                height="100%"
              />
            </div>
            <h3>{video.title}</h3>
            <div className="rating">
              <FaStar className="star-icon" />
              <span className="rating-text">{video.rating}</span>
            </div>
            <div className="user-react">
              <button
                className="remove-button"
                onClick={() => removeVideo(video.id)}
              >
                <FaTrash />
              </button>
              <div className="vote-emojis">
                <div
                  className="vote-button"
                  onClick={() => handleVote(video.id, "like")}
                >
                  <AiFillLike className="like-icon" />
                </div>
                <div
                  className="vote-button"
                  onClick={() => handleVote(video.id, "dislike")}
                >
                  <AiFillDislike className="dislike-icon" />
                </div>
              </div>
            </div>
            <p className="timestamp"> {video.timestamp}</p>
          </div>
        ))}
      </div>
      <AddVideoForm addVideo={addVideo} />
    </div>
  );
};

export default VideoList;
