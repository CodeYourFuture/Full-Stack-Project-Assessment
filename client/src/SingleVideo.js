import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, ButtonGroup, IconButton } from "@mui/material";
import { Favorite, HeartBroken, DeleteForever } from "@mui/icons-material";
import moment from "moment"

import "./App.css";

const SingleVideo = ({ index, video, videoOrder, getVideos, urlToFetch }) => {
  const videoId = video.url.slice(-11);
  const formattedDate = moment(video.timestamp).format("MMMM Do YYYY, h:mm:ss a");
  const startingScore = video.rating;
  const [score, setScore] = useState(startingScore);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const deleteVideo = async (e) => {
    const videoId = video.id;
    const res = await fetch(`${urlToFetch}${videoId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    // setValidInput(data.msg);
    getVideos(videoOrder);
  };
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent className="video-title-container">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Tiro Devanagari Marathi",
            fontSize: "1rem",
          }}
        >
          {video.title}
        </Typography>
      </CardContent>
      <div className="video-container">
        <CardMedia
          component="iframe"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <CardContent>
        <Typography variant="body2">Upload Date: {formattedDate}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="upvote video"
          onClick={() => {
            if (score < startingScore) {
              setScore((score) => score);
            } else if (score === startingScore) {
              setLiked(true);
              setScore((score) => (score += 1));
            } else {
              setLiked(false);
              setScore((score) => (score -= 1));
            }
          }}
        >
          <Favorite color={liked ? "success" : "primary"} />
        </IconButton>
        <Typography variant="body2">{score}</Typography>
        <IconButton
          aria-label="downvote video"
          onClick={() => {
            if (score > startingScore) {
              setScore((score) => score);
            } else if (score === startingScore) {
              setDisliked(true);
              setScore((score) => (score -= 1));
            } else {
              setDisliked(false);
              setScore((score) => (score += 1));
            }
          }}
        >
          <HeartBroken color={disliked ? "error" : "primary"} />
        </IconButton>
        <IconButton aria-label="delete video" onClick={deleteVideo}>
          <DeleteForever color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SingleVideo;
