import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Stack from "@mui/material/Stack";
import { blue, red } from "@mui/material/colors";
import Button from "@mui/material/Button";

function VideoContainer() {
  return (
    <Card sx={{ maxWidth: 560 }}>
      <CardMedia
        sx={{ height: 315, width: 560 }}
        component="iframe"
        src="https://www.youtube.com/embed/FUeyrEN14Rk"
        frameborder="0"
        allowfullscreen
        title=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mac & Cheese | Basics with Babish
        </Typography>
        <Stack
          m={2}
          direction="row"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Button>
            <ThumbUpAltIcon sx={{ fontSize: 40, color: blue[500] }} />
          </Button>
          <Typography variant="h6" color="text.secondary">
            Votes
          </Typography>
          <Button color="error">
            <ThumbDownAltIcon sx={{ fontSize: 40, color: red[600] }} />
          </Button>
        </Stack>
        <Stack mt={3} justifyContent="center" alignItems="center">
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default VideoContainer;
