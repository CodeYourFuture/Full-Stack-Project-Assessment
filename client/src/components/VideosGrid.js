import * as React from "react";
import Grid from "@mui/material/Grid";
import VideoContainer from "./VideoContainer";
import videos from "../exampleresponse.json";
videos = videos.map((video) => {
  video.url = video.url.replace("watch?v=", "embed/");
  return video;
});
function VideosGrid() {
  return (
    <Grid justifyContent="center" m={{ xs: 1, md: 2 }} container>
      {videos.map((video, i) => (
        <Grid m={1}>
          <VideoContainer
            key={i}
            title={video.title}
            url={video.url}
            rating={video.rating}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default VideosGrid;
