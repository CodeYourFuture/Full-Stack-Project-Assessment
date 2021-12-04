import React from "react";
import VideoCard from "../VideoCard/VideoCard";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

const VideoList = ({ videos, setVideos, searchTerm }) => {
  const deleteVideo = (id) => {
    const filteredVideos = videos.filter((video) => video.id !== id);

    fetch(`http://localhost:5000/${id}`, { method: "delete" }).then((res) =>
      res.status === 200 ? setVideos(filteredVideos) : alert("Unable to delete video, please try again")
    );
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {videos
          .filter(
            (video) =>
              video.title.toUpperCase().includes(searchTerm.toUpperCase()) ||
              video.url.toUpperCase().includes(searchTerm.toUpperCase())
          )
          .map((video) => (
            <Grid
              key={video.id}
              item
              xs={12}
              md={5}
              lg={4}
              xl={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <VideoCard video={video} deleteVideo={deleteVideo} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
