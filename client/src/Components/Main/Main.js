import React, { useState } from "react";
import VideoListSort from "../VideoListSort/VideoListSort";
import AddVideoDrawer from "../AddVideoDrawer/AddVideoDrawer";
import Container from "@mui/material/Box";
import VideoList from "../VideoList/VideoList";
import SearchBox from "../SearchBox/SearchBox";
import NumberOfVideos from "../NumberOfVideos/NumberOfVideos";

const Main = ({ videos, setVideos, videoSortOrder, setVideoSortOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <Container
        sx={{
          p: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <VideoListSort
          setVideoSortOrder={setVideoSortOrder}
          videoSortOrder={videoSortOrder}
        />
        <SearchBox setSearchTerm={setSearchTerm} />
        <NumberOfVideos videos={videos} />
      </Container>

      <AddVideoDrawer videos={videos} setVideos={setVideos} />
      <VideoList
        videos={videos}
        setVideos={setVideos}
        searchTerm={searchTerm}
        sx={{ height: "100%" }}
      />
    </main>
  );
};

export default Main;