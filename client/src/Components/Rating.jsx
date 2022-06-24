import React, { useContext } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import Context from "../Context/Context";

const Rating = ({ rating, videoId }) => {
  const ctx = useContext(Context);

  // Handles the video rating
  const vote = (id, voteType) => {
    ctx.setVideos(
      ctx.videos.map((video) => {
        if (video.id !== id) return video;
        return {
          ...video,
          rating: (video.rating += voteType === "up" ? 1 : -1),
        };
      })
    );
    fetch(
      `https://cyf-craig-dsilva-videos.herokuapp.com/${id}/?vote=${voteType}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ).catch((error) => ctx.setError(error));
  };

  return (
    <div className="Rating">
      <ThumbUpIcon onClick={() => vote(videoId, "up")} />
      <p>{rating}</p>
      <ThumbDownIcon onClick={() => vote(videoId, "down")} />
    </div>
  );
};

export default Rating;
