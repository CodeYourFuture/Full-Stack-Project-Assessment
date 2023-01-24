import React from "react";
import Grid from "@mui/material/Grid";
import VideoContainer from "./VideoContainer";

function VideosGrid({ videosData, voteUp, voteDown, deleteVideo }) {
  return (
    <Grid justifyContent="center" m={{ xs: 0, md: 2 }} container>
      {videosData.length > 0 &&
        videosData.map((video, i) => (
          <Grid m={1} key={i}>
            <VideoContainer
              name={video.id}
              title={video.title}
              url={video.url}
              rating={video.rating}
              voteUp={voteUp}
              voteDown={voteDown}
              deleteVideo={deleteVideo}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default VideosGrid;
