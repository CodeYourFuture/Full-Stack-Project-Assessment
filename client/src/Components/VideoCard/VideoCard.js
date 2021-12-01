import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import IFrame from "../IFrame/IFrame";

const VideoCard = ({ video, setVideo, deleteVideo }) => {
  const videoUrlId = video.url.split("v=")[1].substring(0, 11);
  const videoRating = video.rating;
  const videoTitle = video.title;
  const arrayId = video.id;

  const [votes, setVotes] = useState(videoRating);

  const voteHandler = (voteOperator, id) => {
    let updatedVote = videoRating;

    voteOperator === "+" ? updatedVote++ : updatedVote--;

    fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: updatedVote }),
    }).then((res) => {
      res.status === 200 && voteOperator === "+"
        ? setVotes((pV) => pV + 1)
        : setVotes((pV) => pV - 1);
    });
  };

  return (
    <div>
      <Card sx={{ width: 345, height: 410 }} elevation={6}>
        <IFrame video={videoUrlId} />

        <CardContent>
          <Typography
            sx={{ height: 2 }}
            gutterBottom
            variant="body1"
            component="div"
          >
            {videoTitle}
          </Typography>
          <CardActions sx={{ justifyContent: "end", my: 17 }}>
            <Tooltip title="I like this" arrow>
              <IconButton
                onClick={() => voteHandler("+", arrayId)}
                aria-label="like"
                size="small"
              >
                <ThumbUpAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="I dislike this" arrow>
              <IconButton
                onClick={() => voteHandler("-", arrayId)}
                aria-label="dislike"
                size="small"
              >
                <ThumbDownAltIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="subtitle1" color="text.secondary">
              {`${votes} votes`}
            </Typography>

            <Tooltip title="Delete video" arrow>
              <IconButton
                onClick={() => deleteVideo(arrayId)}
                value="4"
                size="small"
                color="error"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoCard;
