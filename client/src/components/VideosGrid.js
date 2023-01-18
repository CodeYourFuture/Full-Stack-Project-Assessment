import React from "react";
import Grid from "@mui/material/Grid";
import VideoContainer from "./VideoContainer";

function VideosGrid({ videosData }) {
  return (
    <Grid justifyContent="center" m={{ xs: 1, md: 2 }} container>
      {videosData &&
        videosData.map((video, i) => (
          <Grid m={1} key={i}>
            <VideoContainer
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
