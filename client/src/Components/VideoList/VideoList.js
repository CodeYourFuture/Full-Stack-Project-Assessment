import React from "react";
import VideoCard from "../VideoCard/VideoCard";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

const VideoList = ({ videos, setVideos }) => {
  const deleteVideo = (id) => {
    const filteredVideos = videos.filter((video) => video.id !== id);

    fetch(`http://localhost:5000/${id}`, { method: "delete" }).then((res) =>
      res.status === 200 ? setVideos(filteredVideos) : console.log(res)
    );
  };

  return (
    <Container maxWidth="xl" sx={{ alignItems: "center" }}>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid key={uuidv4()} item xs={12} md={5} lg={4} xl={3}>
            <VideoCard
              video={video}
              setVideo={setVideos}
              deleteVideo={deleteVideo}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
