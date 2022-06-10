import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, ButtonGroup } from "@mui/material";

import "./App.css";

const SingleVideo = ({ index, video, videos, setVideos }) => {
  const videoId = video.url.slice(-11);
  const startingScore = video.rating;
  const [score, setScore] = useState(startingScore);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const deleteVideo = () => {
    setVideos(videos.filter((video) => video.id !== videos[index].id));
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
        {video.dateAdded && (
          <>
            <Typography variant="body2">This video was uploaded on {video.dateAdded}</Typography>
            <br />
          </>
        )}
        <Typography variant="body2">Votes: {score}</Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup size="small">
          <Button
            size="small"
            variant={liked ? "contained" : "outlined"}
            color={liked ? "success" : "primary"}
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
            Up Vote
          </Button>
          <Button
            size="small"
            variant={disliked ? "contained" : "outlined"}
            color={disliked ? "error" : "primary"}
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
            Down Vote
          </Button>
          <Button size="small" id={video.id} onClick={deleteVideo}>
            Remove Video
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default SingleVideo;
