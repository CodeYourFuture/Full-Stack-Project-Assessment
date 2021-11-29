import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip, Zoom, Fade } from "@mui/material";
import IFrame from "../IFrame/IFrame";

const VideoCard = (props) => {
  const videoUrlId = props.video.url.split("v=")[1].substring(0, 11);
  const videoRating = props.video.rating;
  const videoTitle = props.video.title;
  //   const arrayId = props.video.id;

  const [votes, setVotes] = useState(videoRating);

  return (
    <div>
      <Card sx={{ maxWidth: 345, height: 410 }} elevation={6}>
        <Tooltip
          transitionComponent={Fade}
          TransitionProps={{ timeout: 800 }}
          title="Play"
          arrow
        >
          <IFrame video={videoUrlId} />
        </Tooltip>
        <CardContent>
          <Typography
            sx={{ height: 2 }}
            gutterBottom
            variant="body1"
            component="div"
          >
            {videoTitle}
          </Typography>
          <CardActions sx={{ justifyContent: "end", my: 11 }}>
            <Tooltip title="I like this" arrow>
              <IconButton
                onClick={() => setVotes((v) => v + 1)}
                aria-label="like"
                size="small"
                transitioncomponent={Zoom}
              >
                <ThumbUpAltIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="I dislike this" arrow>
              <IconButton
                onClick={() => setVotes((v) => v - 1)}
                aria-label="dislike"
                size="small"
                transitioncomponent={Zoom}
              >
                <ThumbDownAltIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="subtitle1" color="text.secondary">
              {`${votes} votes`}
            </Typography>

            <Tooltip title="Delete video" arrow>
              <IconButton size="small" color="error" aria-label="delete">
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
