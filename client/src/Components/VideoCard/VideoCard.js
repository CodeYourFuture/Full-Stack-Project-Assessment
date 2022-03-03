import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IFrame from "../IFrame/IFrame";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

const VideoCard = ({ video, deleteVideoHandler }) => {
  const videoUrlId = video.url.split("v=")[1].substring(0, 11);
  const { id, rating, title, uploaded } = video;
  const [votes, setVotes] = useState(rating);

  useEffect(() => {
    fetch(`/api/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: votes }),
    });
  }, [votes]);

  const voteHandler = (voteOperator) => {
    voteOperator === "+" ? setVotes((pV) => pV + 1) : setVotes((pV) => pV - 1);
  };

  return (
    <Card sx={{ width: 340, height: 410 }} elevation={4}>
      <IFrame videoUrlId={videoUrlId} />
      <CardContent>
        <Tooltip title={title} placement="top" arrow>
          <Typography gutterBottom variant="h6" component="div" noWrap={true}>
            {title}
          </Typography>
        </Tooltip>
        <Typography
          sx={{ mt: 1, fontStyle: "italic" }}
          variant="caption"
          component="div"
        >
          {uploaded}
        </Typography>
        <CardActions
          sx={{ justifyContent: "end", marginTop: 10, paddingBottom: 0 }}
        >
          <Tooltip title="I like this" placement="top" arrow>
            <IconButton
              onClick={() => voteHandler("+", id)}
              aria-label="like"
              size="small"
            >
              <ThumbUpAltIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="I dislike this" placement="top" arrow>
            <IconButton
              onClick={() => voteHandler("-", id)}
              aria-label="dislike"
              size="small"
            >
              <ThumbDownAltIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="subtitle1" color="text.secondary">
            {`${votes} votes`}
          </Typography>
          <Tooltip title="Delete video" placement="top" arrow>
            <IconButton
              onClick={() => deleteVideoHandler(id)}
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
  );
};

export default VideoCard;
