import React from "react";
import "./Video.css";
import {Card,CardHeader,CardContent,Typography,Button,} from "@mui/material";

const Video = ({ video, onVoteUp, onVoteDown, onRemove }) => {
  const videoId = extractVideoIdFromUrl(video.url);
  const uploadDate = video.uploadDate
    ? new Date(video.uploadDate).toLocaleString()
    : "N/A";
  console.log("uploadDate:", uploadDate); // Add this line

  return (
    <Card className="video">
      <CardHeader
        title={video.title}
        subheader={`Uploaded on: ${uploadDate}`}
      />
      <CardContent>
        <iframe
          title={video.title}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="vote">
          <Button variant="contained" color="primary" onClick={onVoteUp}>
            &#128077; Up
          </Button>
          <Typography variant="h6" component="span">
            {video.votes}
          </Typography>
          <Button variant="contained" color="secondary" onClick={onVoteDown}>
            &#128078; Down
          </Button>
        </div>
        <Button variant="contained" color="error" onClick={onRemove}>
          Remove Video
        </Button>
      </CardContent>
    </Card>
  );
};



function extractVideoIdFromUrl(url) {
  if (url) {
    const regex = /[?&]v=([^?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  } else {
    // Handle the case where 'url' is undefined or falsy
    return "";
  }
}

export default Video;
