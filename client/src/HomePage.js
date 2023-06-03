import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import "./VideoComponent.css";
import AddVideoForm from "./AddVideoForm";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Ying Xing
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [order, setOrder] = useState("Desc");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        // Order the videos by rating in descending order
        //const sortedVideos = data.sort((a, b) => b.rating - a.rating);
        setVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddVideo = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleRemoveVideo = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== videoId)
    );
  };

  const handleUpvote = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, rating: video.rating + 1 } : video
      )
    );
  };

  const handleDownvote = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoId ? { ...video, rating: video.rating - 1 } : video
      )
    );
  };

  const handleOrderAscending = () => {
    if (order === "Desc") {
      setOrder("Asc");
      setVideos((prev) => prev.sort((a, b) => a.rating - b.rating));
    }
  };

  const handleOrderDescending = () => {
    if (order === "Asc") {
      setOrder("Desc");
      setVideos((prev) => prev.sort((a, b) => b.rating - a.rating));
    }
  };

  return (
    <div>
      {/* hero section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Music Video Recommendation
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Are you a music lover searching for the perfect platform to discover
            and enjoy the latest and greatest music videos? Look no further! Our
            Music Video Recommendation is here to cater to all your musical
            cravings.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={5}
            justifyContent="center"
          >
            <Button variant="contained" onClick={handleOrderAscending}>
              Ascending Order
            </Button>
            <Button variant="outlined" onClick={handleOrderDescending}>
              Descending Order
            </Button>
          </Stack>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={5}
            justifyContent="center"
          >
            <AddVideoForm onAddVideo={handleAddVideo} />
          </Stack>
        </Container>
      </Box>

      {/* video display */}
      {videos.map((video) => (
        <VideoComponent
          key={video.id}
          video={video}
          onRemove={handleRemoveVideo}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
        />
      ))}

      <Copyright />
    </div>
  );
}

export default HomePage;
