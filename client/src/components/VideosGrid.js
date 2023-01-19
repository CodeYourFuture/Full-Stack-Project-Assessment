import React from "react";
import Grid from "@mui/material/Grid";
import VideoContainer from "./VideoContainer";

function VideosGrid({ videosData, voteUp, voteDown }) {
  return (
    <Grid justifyContent="center" m={{ xs: 0, md: 2 }} container>
      {videosData &&
        videosData.map((video, i) => (
          <Grid m={1} key={i}>
            <VideoContainer
              name={video.id}
              title={video.title}
              url={video.url}
              rating={video.rating}
              voteUp={voteUp}
              voteDown={voteDown}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default VideosGrid;
