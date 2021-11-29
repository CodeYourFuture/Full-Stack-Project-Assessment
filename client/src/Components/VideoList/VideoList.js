import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import { v4 as uuidv4 } from "uuid";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => {
        if (res.status <= 200) {
          return res.json();
        } else {
          throw new Error(`Error ${res.status} ${res.statusText}`);
        }
      })
      .then((data) => {
        setVideos(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container sx={{ alignItems: "center" }}>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid key={uuidv4()} item xs={12} md={5} lg={4} xl={3}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoList;
