import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

function VideoContainer({ rating, title, url }) {
  return (
    <Card
      m={2}
      sx={{
        maxWidth: 360,
        height: 480,
      }}
      justifyContent="end"
      alignItems="end"
    >
      <CardMedia
        sx={{ height: 250, width: 400 }}
        component="iframe"
        src={url}
        frameBorder="0"
        allowFullScreen
        title={title}
      />
      <CardContent
        sx={{
          height: 230,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h7">{rating + " Votes"}</Typography>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Stack direction="row">
            <Fab sx={{ mr: 2 }} size="medium">
              <ThumbUpAltIcon sx={{ fontSize: 25, color: grey[600] }} />
            </Fab>
            <Fab size="medium">
              <ThumbDownAltIcon sx={{ fontSize: 25, color: grey[600] }} />
            </Fab>
          </Stack>
          <Stack alignItems="end">
            <Fab  color="error" size="medium">
              <DeleteIcon sx={{ fontSize: 25}} />
            </Fab>
          </Stack>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default VideoContainer;
